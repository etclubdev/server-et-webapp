import {
    Role,
    manageAchivementRole, manageActivityRole, manageBannerRole, manageEtBlogRole, manageFAQRole, managePartnerRole,
    managePersonnelRole, adminRole, manangeEtNewsRole, getByIDPersonnelRole, updatePersonnelRole, changePasswordRole,
    getPesonnelRole, getPartnerRole, getFAQRole, updatePartnerRole
} from './roles';

enum Permission {
    MANAGE_ACHIEVEMENT = "MANAGE_ACHIEVEMENT",
    MANAGE_ACTIVITY = "MANAGE_ACTIVITY",
    MANAGE_BANNER = "MANAGE_BANNER",
    MANAGE_ETBLOG = "MANAGE_ETBLOG",
    MANAGE_FAQ = "MANAGE_FAQ",
    MANAGE_PARTNER = "MANAGE_PARTNER",
    UPDATE_PARTNER = "UPDATE_PARTNER",
    MANAGE_PERSONNEL = "MANAGE_PERSONNEL",
    ADMIN = "ADMIN",
    MANAGE_ETNEWS = "MANAGE_ETNEWS",
    GET_PERSONNEL_BY_ID = "GET_PERSONNEL_BY_ID",
    UPDATE_PERSONNEL = "UPDATE_PERSONNEL",
    CHANGE_PASSWORD = "CHANGE_PASSWORD",
    GET_PERSONNEL = "GET_PERSONNEL",
    GET_PARTNER = "GET_PARTNER",
    GET_FAQ = "GET_FAQ"
}

const permissionRoleMap: Record<Permission, Role[]> = {
    [Permission.MANAGE_ACHIEVEMENT]: manageAchivementRole,
    [Permission.MANAGE_ACTIVITY]: manageActivityRole,
    [Permission.MANAGE_BANNER]: manageBannerRole,
    [Permission.MANAGE_ETBLOG]: manageEtBlogRole,
    [Permission.MANAGE_FAQ]: manageFAQRole,
    [Permission.MANAGE_PARTNER]: managePartnerRole,
    [Permission.UPDATE_PARTNER]: updatePartnerRole,
    [Permission.MANAGE_PERSONNEL]: managePersonnelRole,
    [Permission.ADMIN]: adminRole,
    [Permission.MANAGE_ETNEWS]: manangeEtNewsRole,
    [Permission.GET_PERSONNEL_BY_ID]: getByIDPersonnelRole,
    [Permission.UPDATE_PERSONNEL]: updatePersonnelRole,
    [Permission.CHANGE_PASSWORD]: changePasswordRole,
    [Permission.GET_PERSONNEL]: getPesonnelRole,
    [Permission.GET_PARTNER]: getPartnerRole,
    [Permission.GET_FAQ]: getFAQRole
};

export { Permission, permissionRoleMap };