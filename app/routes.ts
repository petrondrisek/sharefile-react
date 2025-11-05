import { 
    type RouteConfig, 
    route 
} from "@react-router/dev/routes";

export default [
    route("/", "./routes/home.tsx"),
    route("detail/:id", "./routes/detail.tsx"),
] satisfies RouteConfig;
