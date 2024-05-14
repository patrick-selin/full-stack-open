interface HeaderProps {
  courseName: string;
}

function Header({ courseName }: HeaderProps) {
  return <h1>{courseName}</h1>;
}

export default Header;
