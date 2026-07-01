import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Insights } from "./pages/resources/Insights";
import { FAQs } from "./pages/resources/FAQs";
import { Guides } from "./pages/resources/Guides";
import { CaseStudies } from "./pages/resources/CaseStudies";
import { Capabilities } from "./pages/Capabilities";
import { Contact } from "./pages/Contact";
import { UseCases } from "./pages/UseCases";
import { AuraAI } from "./pages/services/AuraAI";
import { Design } from "./pages/services/Design";
import { Web } from "./pages/services/Web";
import { Pro } from "./pages/services/Pro";
import { Ecom } from "./pages/services/Ecom";
import { Support } from "./pages/Support";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "blog", element: <Navigate to="/resources/insights" replace /> },
      { path: "resources/insights", Component: Insights },
      { path: "resources/faqs", Component: FAQs },
      { path: "resources/guides", Component: Guides },
      { path: "resources/case-studies", Component: CaseStudies },
      { path: "capabilities", Component: Capabilities },
      { path: "contact", Component: Contact },
      { path: "use-cases", Component: UseCases },
      { path: "services/aura-ai", Component: AuraAI },
      { path: "services/design", Component: Design },
      { path: "services/web", Component: Web },
      { path: "services/pro", Component: Pro },
      { path: "services/e-com", Component: Ecom },
      { path: "support", Component: Support },
    ],
  },
]);
