<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use SendGrid;
use Mailgun\Mailgun;


class Email extends Model
{
    /**
     * Function to send email using SendGrid
     * @param $request
     * @return mixed
     */
    public static function sendGrid($request)
    {
        //SendGrid Call
        $personalization = new SendGrid\Personalization();
        $mail = new SendGrid\Mail();

        //This line should be changed to a valid email address
        $from = new SendGrid\Email("Joseph Martin", "info@jmdevelopers.com.au");
        $mail->setFrom($from);

        $to_array = explode(',', $request['to']);
        foreach ($to_array as $to){
            $to_obj = new SendGrid\Email($to, $to);
            $personalization->addTo($to_obj);
        }

        if (!is_null($request['cc'])) {
            $cc_array = explode(',', $request['cc']);
            foreach ($cc_array as $cc){
                $cc_obj = new SendGrid\Email($cc, $cc);
                $personalization->addCc($cc_obj);
            }
        }

        if (!is_null($request['bcc'])) {
            $bcc_array = explode(',', $request['bcc']);
            foreach ($bcc_array as $bcc){
                $bcc_obj = new SendGrid\Email($bcc, $bcc);
                $personalization->addBcc($bcc_obj);
            }
        }


        $mail->addPersonalization($personalization);
        $mail->setSubject($request['subject']);

        $content = new SendGrid\Content("text/plain", $request['message']);
        $mail->addContent($content);

        $apiKey = getenv('SENDGRID_API_KEY');

        $sg = new SendGrid($apiKey);
        $response = $sg->client->mail()->send()->post($mail);

        return $response;
    }

    /**
     * Function to send email using MailGun
     * @param $request
     * @return \stdClass
     */
    public static function mailGun($request)
    {
        $apiKey = getenv('MAILGUN_API_KEY');
        $mgClient = new Mailgun($apiKey);
        $domain = "sandbox6c0bd1a957024305a3929c79b4ce6ac7.mailgun.org";

        $data = [
            'from' => 'Mailgun Sandbox <postmaster@sandbox6c0bd1a957024305a3929c79b4ce6ac7.mailgun.org>',
            'to'      => $request['to'],
            'subject' => $request['subject'],
            'text'    => $request['message']
        ];

        if (!is_null($request['cc'])) {
            $data['cc'] = $request['cc'];
        }

        if (!is_null($request['bcc'])) {
            $data['bcc'] = $request['bcc'];
        }

        # Make the call to the client.
        $result = $mgClient->sendMessage("$domain", $data);

        return $result;
    }
}
