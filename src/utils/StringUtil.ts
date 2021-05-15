import { randint } from "tstl/algorithm/random";

export namespace StringUtil
{
    export function random(count: number, onlyAlphabets: boolean = false): string
    {
        let characters: string = onlyAlphabets ? ALPHABETS : LETTERS;
        let ret: string = "";

        while (count-- > 0)
        {
            let rand: number = randint(0, characters.length - 1);
            ret += characters[rand];
        }
        return ret;
    }

    const ALPHABETS: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const LETTERS: string = "0123456789" + ALPHABETS;
}