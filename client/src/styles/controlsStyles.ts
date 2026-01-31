import { css } from "lit";

export const controlsStyles = css`
button {
    color: var(--font-color);
    background-color: var(--primary-color);
    font: inherit;
    border: none;
    padding: .7rem 2rem;
    transition: all .15s ease-in;
}
button:hover {
    cursor: pointer;
    background-color: var(--tertiary-color);
}
button:disabled {
    background-color: var(--bg-color);
    transition: none;
}
`
