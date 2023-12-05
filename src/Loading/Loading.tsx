/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";

const Loading = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<>Loading...</>}>
      <Component {...props} />
    </Suspense>
  );

export default Loading;
