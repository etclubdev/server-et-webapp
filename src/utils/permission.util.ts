import { Role } from '../global/roles';

import { Permission, permissionRoleMap } from '../global/permissions';

export function getPermissionsByRole(role: Role): Permission[] {
    return Object.entries(permissionRoleMap)
        .filter(([_, roles]) => roles.includes(role))
        .map(([permission]) => permission as Permission);
}
