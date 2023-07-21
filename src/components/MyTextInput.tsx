import { Input } from "native-base";
import React from "react";

export default ({ onChange, value, children }) => (
  <>
    <Input size={"2xl"}
           mb={5}
           onChangeText={onChange}
           value={value}
    />
    {children}
  </>
)