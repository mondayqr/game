"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  siteSettings,
  useActiveCurrency,
} from "@/store/features/setup/setupSlice";
import { userLoggedIn } from "@/store/features/auth/authSlice";
// time ago
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
import Script from "next/script";
import TawkTo from "next-tawkto";
import Consent from "../Helper/Consent";
function SiteSetup({ data }) {
  const dispatch = useDispatch();
  dispatch(siteSettings(data));
  //   when load website add auth in redux store
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("auth"));
    if (user?.accessToken) {
      dispatch(
        userLoggedIn({
          accessToken: user?.accessToken,
          expiresIn: user?.expiresIn,
          user: user?.user,
        })
      );
    }
  });
  useEffect(() => {
    if (!window) return;
    if (data?.tawkChat && Number(data?.tawkChat.status) === 1) {
      new TawkTo(data?.tawkChat?.widget_id, data?.tawkChat?.property_id);
    }
  }, []);
  return (
    <>
      {data?.googleAnalytic && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${data.googleAnalytic?.analytic_id}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${data.googleAnalytic?.analytic_id}');
        `}
          </Script>
        </>
      )}
      {data?.cookieConsent && <Consent data={data.cookieConsent} />}
    </>
  );
}

export default SiteSetup;
