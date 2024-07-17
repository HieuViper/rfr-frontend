import { useRouter } from "next/navigation";
import * as NProgress from "nprogress";
export const usePRouter = () => {
  const router = useRouter();

  const { push, replace } = router;

  router.push = (href, options) => {
    NProgress.start();
    push(href, options);
  };

  router.replace = (href, options) => {
    NProgress.start();
    replace(href, options);
  };

  return router;
};
