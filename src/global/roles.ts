/**
 * Enum representing user roles within the system.
 * 
 * This is defined by the sub development team. For more details, 
 * refer to the documentation at: https://app.diagrams.net/#G1mD6UawRHf27UYUJqYliYpTYRsnrxigns#%7B%22pageId%22%3A%22fAqvCsQGd4JR5p5gcHas%22%7D
 */
enum Role {
    Admin = 'Administrator',
    HR = 'Trưởng ban HR',
    Tech = 'Trưởng ban Tech',
    PR = 'Trưởng ban PR',
    EV = 'Trưởng ban EV',
    FER = 'Trưởng ban FER',
    MEM = 'CTV/TV',
}

const manageAchivementRole: Role[] = [
    Role.Admin, Role.PR];

const manageActivityRole: Role[] = [
    Role.Admin, Role.PR, Role.EV, Role.MEM];

const manageBannerRole: Role[] = [
    Role.Admin, Role.PR];

const manageEtBlogRole: Role[] = [
    Role.Admin, Role.HR, Role.Tech, Role.PR, Role.EV, Role.FER, Role.MEM];

const manageFAQRole: Role[] = [
    Role.Admin, Role.PR];

const managePartnerRole: Role[] = [
    Role.Admin, Role.FER];

const updatePartnerRole: Role[] = [
    Role.Admin, Role.PR, Role.FER];

const managePersonnelRole: Role[] = [
    Role.Admin, Role.HR, Role.Tech, Role.PR, Role.EV, Role.FER];

const adminRole: Role[] = [
    Role.Admin];

const manangeEtNewsRole: Role[] = [
    Role.Admin, Role.PR, Role.MEM];

const getByIDPersonnelRole: Role[] = [
    Role.Admin, Role.HR, Role.Tech, Role.PR, Role.EV, Role.FER, Role.MEM];

const updatePersonnelRole: Role[] = [
    Role.Admin, Role.HR, Role.Tech, Role.PR, Role.EV, Role.FER, Role.MEM];

const changePasswordRole: Role[] = [
    Role.Admin, Role.HR, Role.Tech, Role.PR, Role.EV, Role.FER, Role.MEM];

const getPesonnelRole: Role[] = [
    Role.Admin, Role.HR, Role.Tech, Role.PR, Role.EV, Role.FER];

const getPartnerRole: Role[] = [
    Role.Admin, Role.HR, Role.Tech, Role.PR, Role.EV, Role.FER];
const getFAQRole: Role[] = [
    Role.Admin, Role.HR, Role.Tech, Role.PR, Role.EV, Role.FER];









export {
    manageAchivementRole, manageActivityRole, manageBannerRole, manageEtBlogRole, manageFAQRole, managePartnerRole,
    managePersonnelRole, adminRole, manangeEtNewsRole, getByIDPersonnelRole, updatePersonnelRole, changePasswordRole,
    getPesonnelRole, getPartnerRole, getFAQRole, updatePartnerRole
};
