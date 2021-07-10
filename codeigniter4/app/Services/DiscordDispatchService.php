<?php namespace App\Services;

// Get Base info takes connection and sql query
class DiscordDispatchService {
  function __construct()
   {

   }

   public function createMessage($json)
   {
     $footerMessage = $json->ontime;
     $driverName = str_replace(' ', '%20', $json->driverName);
     $url = "https://discord.com/api/webhooks/863437261562445865/mhE11wLX5NSptzF1DVX3PnxBSfKAkAuBMhi-jQRMESYNDKqKhWP7tjFeZ9b4tccX6YQ2";
     // security issue with this being false not tested ?? curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
     $hookObject = json_encode([
         /*
          * The general "message" shown above your embeds
          */
         "content" => "",
         /*
          * The username shown in the message
          */
         "username" => "Dispatch",
         /*
          * The image location for the senders image
          */
         "avatar_url" => "http://www.vanguard-trucking.com/icon.png",
         /*
          * Whether or not to read the message in Text-to-speech
          */
         "tts" => false,
         /*
          * File contents to send to upload a file
          */
         // "file" => "",
         /*
          * An array of Embeds
          */
         "embeds" => [
             /*
              * Our first embed
              */
             [
                 // Set the title for your embed
                 "title" => "Status Update!",

                 // The type of your embed, will ALWAYS be "rich"
                 "type" => "rich",

                 // A description for your embed
                 "description" => "",

                 // The URL of where your title will be a link to
                 "url" => "http://www.vanguard-trucking.com/vgdt-driver/name/" . $driverName,

                 /* A timestamp to be displayed below the embed, IE for when an an article was posted
                  * This must be formatted as ISO8601
                  */
                 // "timestamp" => "2018-03-10T19:15:45-05:00",

                 // The integer color to be used on the left side of the embed
                 "color" => hexdec( "FFFFFF" ),

                 // Footer object
                 "footer" => [
                     "text" => $footerMessage,
                     "icon_url" => "http://www.vanguard-trucking.com/discordIcon.png"
                 ],

                 // Image object
                 "image" => [
                     "url" => "http://www.vanguard-trucking.com/discordLogo.png"
                 ],

                 // Thumbnail object
                 "thumbnail" => [
                     "url" => "http://www.vanguard-trucking.com/discordIcon.png"
                 ],

                 // Author object
                 "author" => [
                     "name" => $json->driverName,
                     "url" => "http://www.vanguard-trucking.com/vgdt-driver/name/" . $driverName
                 ],

                 // Field array of objects
                 "fields" => [
                     [
                         "name" => "Status",
                         "value" => $json->status,
                         "inline" => true
                     ],
                     [
                          "name" => "Load#",
                          "value" => $json->loadNumber,
                          "inline" => true
                     ],
                     [
                         "name" => "Pickup",
                         "value" => $json->pickupLocation,
                         "inline" => false
                     ],
                     [
                         "name" => "Time",
                         "value" => $json->pickupDate,
                         "inline" => false
                     ],
                     [
                         "name" => "Delivery",
                         "value" => $json->dropoffLocation,
                         "inline" => false
                     ],
                     [
                         "name" => "Time",
                         "value" => $json->dropoffDate,
                         "inline" => false
                     ]
                 ]
             ]
         ]

     ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );

     $headers = [ "Content-Type: application/json; charset=utf-8" ];
     $POST = [ "username" => "Testing BOT", "content" => "Testing message" ];

     $ch = curl_init();
     curl_setopt($ch, CURLOPT_URL, $url);
     curl_setopt($ch, CURLOPT_POST, true);
     curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
     curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
     curl_setopt($ch, CURLOPT_POSTFIELDS, $hookObject);

     return $ch;
   }

}
