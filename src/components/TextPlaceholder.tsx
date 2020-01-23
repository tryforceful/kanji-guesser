import styled from "styled-components"

interface Props {
  variant?: string
}

// prettier-ignore
const TextPlaceholder = styled.div`
    position: relative;
    bottom: -5px;
    background-color: var(--ion-color-${(props: Props) => props.variant}-tint);
    height: 40px;
    width: 40px;
    display: inline-block;
    border-radius: 6px;
    opacity: 0.5;
    vertical-align: baseline;
  `

TextPlaceholder.defaultProps = {
  variant: "primary"
}

export default TextPlaceholder
