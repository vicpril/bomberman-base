import { SpritesBomb } from 'game/core/classes/sprites/SpritesBomb';
import { RendererType } from 'game/core/types/RenderersTypes';

type BombsRenderer = RendererType<[number, number][]>

export const BombsRendererCreator = (context: CanvasRenderingContext2D): BombsRenderer => {
  const cache: Record<string, SpritesBomb> = {};

  const render = (data: [number, number][]) => {
    data.forEach(([x, y]) => {
      if (!cache[`${x}:${y}`]) {
        cache[`${x}:${y}`] = new SpritesBomb(context, { x, y });
      }
    });

    Object.values(cache).forEach((sprite) => {
      if (!data.some(([x, y]) => x === sprite.pos.x && y === sprite.pos.y)) {
        sprite.destroy();
        delete cache[`${sprite.pos.x}:${sprite.pos.y}`];
      }
    });
  };

  return {
    render,
  };
};
