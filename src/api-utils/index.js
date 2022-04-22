import Config from '@/Config'

export const makeRequest = async (url, body) => {
    return await fetch(`${Config.baseUrl}/${url}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'token': Config.token
        },
        body
    });
}

export const validateNumber = async number => {
    return await makeRequest("validatemobile", JSON.stringify({
        "MobileNo": number
    }));
}

export const sendOtp = async (MobileNo, OTP) => {
    return await makeRequest("validateOTP", JSON.stringify({
        MobileNo,
        "OTP": OTP
    }));
}

export const requestProfile = async AccessId => {
    return await makeRequest("profileRequest", JSON.stringify({
        "AccessId": "883217495722675713416e41a25dd051"
    }));
}

export const getAnnouncements = async AccessId => {
    return await makeRequest("AnnouncementRequest", JSON.stringify({
        "AccessId": "883217495722675713416e41a25dd051",
        "BuildingName": "PLAZA33 Chinese"
    }));
}

export const getVisitors = async AccessId => {
    return await makeRequest("PlannedVisitor", JSON.stringify({
        "AccessId": "883217495722675713416e41a25dd051",
        "BuildingName": "PLAZA33"
    }));
}

export const getVisitorsHistory = async AccessId => {
    return await makeRequest("HistoryVisitor", JSON.stringify({
        "AccessId": "883217495722675713416e41a25dd051",
        "BuildingName": "PLAZA33"
    }));
}

export const inviteVisitors = async AccessId => {
    return await makeRequest("InviteVisitor", JSON.stringify({
        "AccessId": "883217495722675713416e41a25dd051",
        "BuildingName": "PLAZA33"
    }));
}

export const getQRAccess = async AccessId => {
    return await makeRequest("qraccess", JSON.stringify({
        "AccessId": "883217495722675713416e41a25dd051",
        "BuildingName": "PLAZA33 Chinese"
    }));
}

export const registerUser = async body => {
    return await makeRequest("signup", JSON.stringify(body));
}



