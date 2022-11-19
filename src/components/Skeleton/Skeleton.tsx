import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import ContentLoader from "react-content-loader"

interface loaderTypes {
   children ?: any,
   width ?: string | number,
   margin ?: string | number,
   borderRadius ?: string | number,
   height ?: string | number,
   delay ?: string | number, 
   count ?: string | number,
}

// const MyLoader = (props: loaderTypes) => (
//    <ContentLoader 
//      speed={2}
//      width={props?.width}
//      height={props?.height}
//      viewBox="0 0 400 160"
//      backgroundColor="#f3f3f3"
//      foregroundColor="#ecebeb"
//      {...props}
//    >
//       {props?.children}
//    </ContentLoader>
//  )
 
//  export default MyLoader



const Skelet = (props : loaderTypes) => {
  return (
    <SkeletonTheme>
        <Skeleton
          borderRadius={props?.borderRadius}
          count={1}
          height={props?.height}
          width={props?.width}
          duration={1.5}
        />
    </SkeletonTheme>
  );
};
export default Skelet;

 {/* <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
 <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
 <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
 <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
 <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />  */}
 {/* <circle cx="20" cy="20" r="20" /> */}