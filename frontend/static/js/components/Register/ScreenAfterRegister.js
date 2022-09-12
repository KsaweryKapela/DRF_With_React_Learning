import React from "react";

export default function ScreenAfterRegister(data) {

    return (<div>
            <h1>Thank you for your registration</h1>
            <p>The confirmation mail has been sent to your email {data.email}</p>
        </div>)
}