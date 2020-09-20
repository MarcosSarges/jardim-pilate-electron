import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const App = ({ children }: Props) => <>{children}</>;

export default App;
