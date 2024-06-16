export let AbilityName = {
    Strength: "Strength",
    Speed: "Speed",
    Defense: "Defense",
    Agility: "Agility",
    Intelligence: "Intelligence",
    Stamina: "Stamina",
    Endurance: "Endurance",
    Stealth: "Stealth",
    Healing: "Healing"
} as const;

type AbilityNameType = keyof typeof AbilityName;

export interface Ability {
    name: AbilityNameType;
    power: number;
}

function addAbilityName(name: string) {
    (AbilityName as any)[name] = name;
}

function removeAbilityName(name: string) {
    delete (AbilityName as any)[name];
}