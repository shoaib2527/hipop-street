import Reactotron from "reactotron-react-native";
import { reactotronRedux as reduxPlugin } from "reactotron-redux";
import ImmutableObject from "seamless-immutable";
import Config from "../Config/DebugConfig";

let reactotron: any;
if (Config.useReactotron) {
  // https://github.com/infinitered/reactotron for more options!
  reactotron =  Reactotron
    .configure({ name: "MusicApp" })
    .useReactNative()
    .use(reduxPlugin({ onRestore: ImmutableObject }))
    .connect();

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear();

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  // (console as any).tron = Reactotron;
}
export default reactotron;
