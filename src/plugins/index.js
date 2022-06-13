import {
  Button,
  Divider,
  Icon,
  Select,
  TabPane,
  Tabs,
  Option,
} from "element-ui";

let plugins = [Button, Select, Tabs, TabPane, Icon, Divider, Select, Option];

export default function getEle(Vue) {
  plugins.forEach((item) => {
    return Vue.use(item);
  });
}
