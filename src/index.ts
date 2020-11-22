import { PixiPlayground } from "./app/playground";

const playground = new PixiPlayground(document.body);
playground.init()
    .onComplete
    .add(() => playground.renderSimpleExample());