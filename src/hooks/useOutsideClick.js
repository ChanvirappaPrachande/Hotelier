import { useEffect, useRef } from "react";

function useOutsideClick(fn, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) fn();
      }
      document.addEventListener("click", handleClick, listenCapturing);
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [fn]
  );
  return { ref };
}

export default useOutsideClick;
