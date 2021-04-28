import { Toolbar } from "@material-ui/core";
import Head from "next/head";
import ProtectedLayout from "../../components/ProtectedLayout";

export default function UpdateProfile() {
  return (
    <>
      <Head>
        <title>Update Profile</title>
      </Head>
      <ProtectedLayout>
        <Toolbar />
        hello
      </ProtectedLayout>
    </>
  );
}
