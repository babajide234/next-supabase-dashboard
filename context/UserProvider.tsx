'use client';

import { usePermissionsStore } from "@/lib/store/permissions";
import { useUserStore } from "@/lib/store/user";
import { ReactNode, useEffect } from "react";

export default function UserProvider({
  user,
  permission,
  children,
}: {
  user: any;
  permission: any;
  children: ReactNode;
}) {
  useEffect(() => {

    useUserStore.setState({user: user })
	usePermissionsStore.setState({ permissions: permission})
  }, [user, permission]);

  return <>{children}</>;
}
