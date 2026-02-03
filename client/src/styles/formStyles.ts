import { css } from "lit";

export const formStyles = css`
.form-field {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem 0;
    margin: 0;
}
input[type=text],
input[type=number] {
    padding: 1rem;

    font: inherit;
    color: var(--font-color);
    background-color: transparent;
    outline: none;

    border: 1px solid var(--secondary-color);
    border-bottom-width: 3px;
}
input[type=text]:focus,
input[type=number]:focus {
    border-color: var(--tertiary-color);
}
input[type=text]::placeholder,
input[type=number]::placeholder {
    color: var(--font-color);
    opacity: .6;
}
input[type=number] {
    -webkit-appearance: textfield;
    appearance: textfield;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`;
