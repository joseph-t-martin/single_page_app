<?php

namespace App\Http\Controllers;

use App\Email;
use Illuminate\Http\Request;

class EmailController extends Controller
{
    /**
     * Sends an email
     * The function first attempts to send the email using SendGrid but if it fails
     * It will attempt to send the email using MailGun
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function send(Request $request)
    {
        $this->validate($request, [
            'to' => 'required|max:255',
            'subject' => 'required|max:255',
            'message' => 'required|max:255',
        ]);

        $email = new Email();
        $result['result'] = 'success';

        //Try sending with SendGrid
        $response = $email->sendGrid($request);

        //If for whatever reason the email didn't sent correctly
        //try again with MailGun
        if ($response->statusCode() !== 202) {
            $response = $email->mailGun($request);

            //If the mailGun Response is invalid as well
            if ($response->http_response_code !== 200) {
                //Return an error
                $result['result'] = 'error';
            }
        }

        echo json_encode($result);
        exit();
    }

}
