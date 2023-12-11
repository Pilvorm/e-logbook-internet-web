import React, { useState } from "react";
import { 
    Input
} from "reactstrap";
import { getSession, useSession } from "next-auth/react";
import { wrapper } from "redux/store";
import { Paper } from "@mui/material";
import VerticalLayout from "src/@core/layouts/VerticalLayout";
import { useRouter } from "next/router";

const MasterArea = ({ pageNumber }) => {
  const handlePagination = () => {};
  const router = useRouter();
  const [active, setActive] = useState("1");
  const [isExportLoading, setIsExportLoading] = useState(false);
  const toggle = (key) => setActive(key);
  return (
    <div>
      <h2 className="py-2">Report Hydrant</h2>
      <Paper elevation={6}>
        <div className="px-2 py-2 mb-2">
          
        </div>
      </Paper>
    </div>
  );
};

MasterArea.getLayout = function getLayout(page) {
  return <VerticalLayout>{page}</VerticalLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    // console.log("Token dsds");
    const sessionData = await getSession(ctx);

    if (!sessionData) {
      return {
        redirect: {
          destination: `/auth?url=${ctx.resolvedUrl}`,
          permanent: false,
        },
      };
    }
    return {
      props: {
        pageNumber: 3,
        userRoles: sessionData
      },
    };
  }
);

export default MasterArea;
