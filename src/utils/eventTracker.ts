import ReactGA from "react-ga4";

const eventTracker = (name: string, label?: string) => {
  ReactGA.event(name, {
    action: "click",
    category: "UI",
    label: label,
  });
};
export default eventTracker;
