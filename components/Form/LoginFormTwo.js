// import Link from "next/link";
// import { User } from "react-feather";
// import InputPasswordToggle from "src/@core/components/input-password-toggle";
// import {
//   Card,
//   CardBody,
//   Form,
//   FormGroup,
//   Input,
//   Button,
//   InputGroup,
//   InputGroupAddon,
//   InputGroupText,
// } from "reactstrap";
// import Image from "next/image";
// import { useState } from "react";
// import { getCsrfToken, getSession } from "next-auth/react";

// const LoginFormTwo = (props) => {
//   return (
//     <Card className="mb-0">
//       <CardBody>
//         <Link href="/">
//           <a className="brand-logo">
//             <Image src="/images/logo/kalbe-logo.png" width={113} height={51} />
//           </a>
//         </Link>
//         <Form
//           method="POST"
//           action="/api/auth/callback/credentials"
//           className="auth-login-form mt-2"
//         >
//           <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

//           <FormGroup>
//             <InputGroup>
//               <InputGroupAddon addonType="prepend">
//                 <InputGroupText>
//                   <User size={18} className="text-muted" />
//                 </InputGroupText>
//               </InputGroupAddon>
//               <Input
//                 type="text"
//                 id="username"
//                 placeholder="Username"
//                 autoFocus
//               />
//             </InputGroup>
//           </FormGroup>
//           <FormGroup>
//             <InputPasswordToggle
//               prependLogo
//               className="mt-2"
//               id="password"
//               placeholder="Password"
//             />
//           </FormGroup>
//           <Button.Ripple type="submit" color="primary" block className="mt-3">
//             Login
//           </Button.Ripple>
//         </Form>
//         <hr className="mt-3" />
//         <div className="auth-footer-btn d-flex flex-column justify-content-center align-items-center">
//           <p className="text-dark m-0">Version 1.0</p>
//           <p className="text-dark m-0">&#169;2022 - PT. Kalbe Farma Tbk.</p>
//         </div>
//       </CardBody>
//     </Card>
//   );
// };

// export async function getServerSideProps(ctx) {
//   const sessionData = await getSession(ctx);

//   if (sessionData) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: "false",
//       },
//     };
//   }

//   return {
//     props: {
//       csrfToken: await getCsrfToken(ctx),
//     },
//   };
// }

// export default LoginFormTwo;

import React from "react";

const LoginFormTwo = () => {
  return <div>LoginFormTwo</div>;
};

export default LoginFormTwo;
