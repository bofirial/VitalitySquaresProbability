
export class VitalitySquare {
    color: string;
    icon: string;
}

export class VitalitySquareConfiguration extends VitalitySquare {
    total: number;
    remaining: number;
    isRandomColor: boolean;
    isRandomIcon: RandomIconModes;
}

export enum RandomIconModes {
    NotRandom = 1,
    Fruit = 2,
    JunkFood = 3
}

export enum VitalitySquareGameModes {
    Play = 1,
    Edit = 2
}

export enum Colors {
    Green = 1,
    Orange = 2,
    Yellow = 3,
    Purple = 4,
    Blue = 5,
    Red = 6
}

export enum Icons {
    Apple = 1,
    FastFood = 2,
    Grape = 3,
    Banana = 4,
    Cake = 5,
    Cupcake = 6,
    Bread = 7,
    Broccoli = 8,
    Cheese = 9,
    Wine = 10,
    Beer = 11,
    Fish = 12,
    Sandwich = 13,
    Steak = 14,
    Tea = 15,
    Carrot = 16,
    Gear = 17,
    QuestionMark = 18
}

export class FlatIcons {
    static Apple: string = "flaticon-apple55";
    static FastFood: string = "flaticon-fast-food";
    static Grape: string = "flaticon-fruit72";
    static Banana: string = "flaticon-healthy-food4";
    static Cake: string = "flaticon-sweet9";
    static Cupcake: string = "flaticon-baked2";
    static Bread: string = "flaticon-bread14";
    static Broccoli: string = "flaticon-broccoli";
    static Cheese: string = "flaticon-cheese14";
    static Wine: string = "flaticon-drink110";
    static Beer: string = "flaticon-drink24";
    static Fish: string = "flaticon-fish52";
    static Sandwich: string = "flaticon-sandwich";
    static Steak: string = "flaticon-steak";
    static Tea: string = "flaticon-tea24";
    static Carrot: string = "flaticon-vegetables4";
    static Gear: string = "flaticon-gear39";
    static QuestionMark: string = "flaticon-question30";
}

export class IconGroups {
    static FruitIcons: Array<Icons> = [Icons.Apple, Icons.Banana, Icons.Grape];
    static JunkFoodIcons: Array<Icons> = [Icons.FastFood, Icons.Cake, Icons.Cupcake];
    static DrinkIcons: Array<Icons> = [Icons.Wine, Icons.Beer, Icons.Tea];
    static VegetableIcons: Array<Icons> = [Icons.Broccoli, Icons.Carrot];
}