import {Mixin} from "../core/Mixin";

export class MixinHelper {
    public static applyMixins(derivedCtor: any, baseCtors: any[]) {
        baseCtors.forEach((baseCtor) => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    }

    public static getMixinAnnotation( mixinClass: Mixin) {
        return (target: any) => {
            MixinHelper.applyMixins(target, [mixinClass]);
        };
    }
}
