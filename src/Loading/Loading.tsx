/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Suspense } from "react";
import { Spinner } from "react-bootstrap";

const Loading = (Component: React.ComponentType<any>) => (props: any) => (
  <Suspense
    fallback={
      <div
        style={{
          marginLeft: "300px",
          width: "calc(100% - 280px)",
          marginRight: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "rgba(34, 34, 34, 0.6)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Spinner
          animation="border"
          role="status"
          variant="warning"
          style={{ fontSize: "3rem" }}
        />
      </div>
    }
  >
    <Component {...props} />
  </Suspense>
);

export default Loading;
