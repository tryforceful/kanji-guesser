import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import { home, list, school } from "ionicons/icons";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import { AppPage } from "./declarations";
import Home from "./pages/Home";
import KanjiGuesser from "./pages/KanjiGuesser";
import Settings from "./pages/Settings";
/* Theme variables */
import "./theme/variables.css";

const appPages: AppPage[] = [
  {
    title: "Guess Kanji",
    url: "/kanji-guess",
    icon: school
  },
  {
    title: "Settings",
    url: "/settings",
    icon: list
  },
  {
    title: "Home Demo Page",
    url: "/home",
    icon: home
  }
];

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu appPages={appPages} />
        <IonRouterOutlet id="main">
          <Route path="/home" component={Home} exact={true} />
          <Route path="/settings" component={Settings} exact={true} />
          <Route path="/kanji-guess" component={KanjiGuesser} exact={true} />
          <Route
            path="/"
            render={() => <Redirect to="/kanji-guess" />}
            exact={true}
          />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
