import ky from "ky";

export const apiKy = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BASE_URL,
  // hooks: {
  //   beforeRequest: [
  //     async (request) => {
  //       const cookieStore = await cookies();
  //       const token = cookieStore.get("cut-and-work-token");
  //       request.headers.set("Authorization", `Bearer ${token}`);
  //     },
  //   ],
  //   afterResponse: [
  //     async (request) => {
  //       const cookieStore = await cookies();
  //       const token = cookieStore.get("cut-and-work-token");
  //       request.headers.set("Authorization", `Bearer ${token}`);
  //     },
  //   ],
  // },
});
