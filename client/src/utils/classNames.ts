export default function classNames(...args: any[]) {
  return args
    .reduce((acc, val) => {
      if (typeof val === "string") return acc.concat(val.split(" "));
      if (typeof val === "undefined") return acc;
      return acc.concat(Object.values(val));
    }, [])
    .join(" ");
}
