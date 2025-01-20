"use strict";(()=>{var e={};e.id=541,e.ids=[541],e.modules={5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6762:(e,n)=>{Object.defineProperty(n,"M",{enumerable:!0,get:function(){return function e(n,t){return t in n?n[t]:"then"in n&&"function"==typeof n.then?n.then(n=>e(n,t)):"function"==typeof n&&"default"===t?n:void 0}}})},5664:(e,n,t)=>{t.r(n),t.d(n,{config:()=>m,default:()=>d,routeModule:()=>p});var r={};t.r(r),t.d(r,{default:()=>l});var o=t(9947),i=t(325),s=t(6762);let a=require("nodemailer");var u=t.n(a);async function l(e,n){if("POST"===e.method){let{name:t,email:r,mobileNumber:o,selectedDate:i,selectedTime:s,upiTransactionId:a}=e.body;if(!t||!r||!o||!i||!s||!a)return n.status(400).json({error:"Missing required fields: name, email, mobile number, upiTransactionId, or appointment time."});let l=u().createTransport({service:"Gmail",auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASS}}),d={from:process.env.EMAIL_USER,to:process.env.RECEIVER_EMAIL,subject:"New Appointment Confirmation For BCGCM",text:`New appointment confirmation For BCGCM:
        Name: ${t}
        Email: ${r}
        Mobile: ${o}
        Appointment Date: ${i}
        Appointment Time: ${s}
              UPI Transaction ID: ${a}
`},m={from:process.env.EMAIL_USER,to:r,subject:"Appointment Confirmation",text:`
        Dear ${t},

        Your appointment has been successfully booked for ${i} at ${s} & your UPI Transaction ID: ${a}
. 

        Thank you for using our service!

        Regards,
        Team BCGCM India
      `};try{await l.sendMail(d),await l.sendMail(m),n.status(200).json({message:"Confirmation emails sent successfully"})}catch(e){console.error("Error sending email:",e),console.log(n),n.status(500).json({error:"Failed to send confirmation emails"})}}else n.status(405).json({message:"Method Not Allowed"})}let d=(0,s.M)(r,"default"),m=(0,s.M)(r,"config"),p=new o.PagesAPIRouteModule({definition:{kind:i.A.PAGES_API,page:"/api/send",pathname:"/api/send",bundlePath:"",filename:""},userland:r})},325:(e,n)=>{Object.defineProperty(n,"A",{enumerable:!0,get:function(){return t}});var t=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},9947:(e,n,t)=>{e.exports=t(5600)}};var n=require("../../webpack-api-runtime.js");n.C(e);var t=n(n.s=5664);module.exports=t})();