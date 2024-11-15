
import { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import queryOptions from "~/api/category/queryOption";




export const homeQuery= (page,size)=> queryOptions.list(page, size)
export const homeGetParams= ({ searchParams })=> {
  const page= searchParams.get("page");
  const size= searchParams.get("size");
  const pageVal= Number(page) || 0;
  const sizeVal= Number(size) || 9;
  return { page: pageVal, size: sizeVal }
}

export async function getCategory({
  request,
}: any) {
  // console.log('getData!!!!!!!!!!!!!!', process.env)
  // return;
  /* const cachedData = queryClient.getQueryData("myQueryKey");

  if (cachedData) {
    // 캐시가 있으면 서버 요청을 생략하고 캐시된 데이터 반환
    return { data: cachedData };
  } else {
    // 캐시가 없으면 서버 요청 수행
    const data = await fetchMyData();
    // 새 데이터를 캐시에 저장
    queryClient.setQueryData("myQueryKey", data);
    return { data };
  } */

  const url = new URL(request.url);
  const { page, size }= homeGetParams({ searchParams: url.searchParams })

  const queryClient = new QueryClient()
  const { queryKey, queryFn }= homeQuery(page, size);

  const cachedData = queryClient.getQueryData(queryKey);
  console.log('cachedData', cachedData)

  const res= await queryClient.prefetchQuery({ 
    queryKey, queryFn,
    staleTime: 30*1000,
    gcTime: 100000,
  } );
  // queryClient.setQueryData(queryKey, {a: ''});
  console.log('res',res)

  return json({ dehydratedState: dehydrate(queryClient) })
}