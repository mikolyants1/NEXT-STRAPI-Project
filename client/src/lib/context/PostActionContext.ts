import { createContext } from "react";
import { IContext } from "../type";

export const PostActionContext = createContext<IContext>({} as IContext);