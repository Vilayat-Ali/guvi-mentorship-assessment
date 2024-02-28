import {useState, useCallback, type Dispatch, type SetStateAction} from 'react';

const useToggle = (defaultState: boolean = false): readonly [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
    const [state, setState] = useState<boolean>(defaultState);

    const Toggle = useCallback(() => setState(!state), [state]);

    return [state, Toggle, setState] as const;
}

export default useToggle;