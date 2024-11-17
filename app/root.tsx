import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import "./tailwind.css";
import dotenv from "dotenv";
import path from "path";
import { LinksFunction, MetaFunction } from "@remix-run/node";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { useCategoryState, useEnv, useMediaQueryState } from "./store/store";
import queryOptions from "./api/category/queryOption";
import _ from 'lodash'
import HomeWrapper from "./layout/home/HomeWrapper";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


/* export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Remix",
        url: "https://remix.run",
      },
    },
  ];
}; */

const links: LinksFunction = () => {
  return [
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180", },
    { rel: "icon",type: "image/png", sizes: "32x32", href: "/favicon/favicon-32x32.png" },
    { rel: "icon",type: "image/png", sizes: "16x16", href: "/favicon/favicon-16x16.png" },
    { rel: "manifest", href: "/favicon/site.webmanifest" },
    { rel: "mask-icon", href: "/favicon/safari-pinned-tab.svg", color: "#5bbad5" },
  ];
};


const meta: MetaFunction = () => {
  return [
    { title: "메메지션" },
    { name: "확실한 성공의 길을 제시합니다.", content: "메메지션과 함께 하세요!" },
    { name: "msapplication-TileColor", content: "#da532c" },
    { name: "theme-color", content: "#ffffff" },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "myz",
        url: "https://www.myz.com",
      },
    },
  ];
};
export { links, meta }


const exception= [
  'admin',
]

export async function loader() {
  const env = process.env.NODE_ENV;
  dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}.local`) });
  dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
  dotenv.config(); // 기본 .env 파일
  console.log('env:',env, 'url:', process.env)
  return json({
    ENV: {
      SOME_SECRET: process.env.REMIX_PUBLIC_SOME_SECRET,
      REMIX_PUBLIC_API_URL: process.env.REMIX_PUBLIC_API_URL,
      REMIX_PUBLIC_UPLOAD_PATH: process.env.REMIX_PUBLIC_UPLOAD_PATH,
    },
  });
}





export function Layout({ children }: { children: React.ReactNode }) {
  const env = useLoaderData<typeof loader>();
  // console.log('Layout', env)
  const { setEnv }= useEnv()
  useEffect(()=> {
    if( env ) setEnv(env)
  }, [env])
  
  const location= useLocation()
  const { pathname }= location;
  const except= exception.indexOf(pathname.split('/')[1])

  const mediaQuery= useMediaQueryState()
  const xs = useMediaQuery({ minWidth: 0 })
  const sm = useMediaQuery({ minWidth: 480 })
  const md = useMediaQuery({ minWidth: 860 })
  const lg = useMediaQuery({ minWidth: 1224 })
  const xl = useMediaQuery({ minWidth: 2200 })

  useEffect(()=> {
    console.log('mediaQuery::',xs, sm, md, lg, xl)
    mediaQuery.setMediaQuery({ xs, sm, md, lg, xl })
  }, [xs, sm, md, lg, xl])


  // console.log(mediaQuery, env, 'envenv')
  /* const error = useRouteError();
  let errorMessage;

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = '알 수 없는 오류가 발생했습니다.';
  }
  if (error) return (
    <div>
      <h1>오류가 발생했습니다!</h1>
      <p>{errorMessage}</p>
    </div>
  ); */


  
  

  

  const navigation = useNavigation();
  // console.log(navigation, pathname)

  // if( navigation.state == 'loading' ) {
  //   console.log(pathname)
  //   return <div className="">loading.......</div>
  // }

  return (
        
    <html lang="ko" className="">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossrigin> */}
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Josefin+Sans:wght@100&display=swap" rel="stylesheet"></link>
      </head>
      <body>

        {
          // navigation.state == 'loading' &&
          // <div className="">loading.......</div>
        }
        {/* {
          // navigation.state != 'loading' &&
          <>
          { except != -1 && children }
          { except == -1 && 
            <HomeWrapper>
              {children}
              <></>
            </HomeWrapper>
          }
          </>
        } */}
        {children}
        {/* <Outlet /> */}
        
          
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(
              env.ENV
            )}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}


export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  )
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </>
  )
}
