import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { Link } from "react-router-dom";

const SytledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Sidebar() {
  return (
    <SytledSidebar>
      <Link to="/">
        <Logo />
      </Link>
      <MainNav />
    </SytledSidebar>
  );
}

export default Sidebar;
