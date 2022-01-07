export const singleTrainerMapper = async(userprops) => {
    let { password, ...rest } = userprops?.dataValues;
    return rest;
};
