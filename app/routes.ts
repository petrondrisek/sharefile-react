import { 
    type RouteConfig, 
    route 
} from "@react-router/dev/routes";

export default [
    route("/", "./routes/home/home.tsx"),
    route("detail/:id", "./routes/detail/detail.tsx"),
    route('/upload', './routes/upload/upload.tsx'),
] satisfies RouteConfig;
