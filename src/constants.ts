const BASE_PORTAL_URL = "http://portal.etclub.vn/";

export const sendingEmailContent = (action: "create" | "reset", personnel_name: string, username: string, password: string) => {
    const content = { title: "", body: "" };
    var announcingText = "";

    if (action === "create") {
        content.title = "ETConnect | Thông tin đăng nhập tài khoản mới";
        announcingText = `Tài khoản của bạn đã được khởi tạo thành công trên hệ thống <a href="${BASE_PORTAL_URL}">ETConnect</a>.`;
    } else if (action === "reset") {
        content.title = "ETConnect | Yêu cầu đặt lại mật khẩu";
        announcingText = "Hệ thống đã nhận được yêu cầu đặt lại mật khẩu thành công!";
    }

    content.body = baseEmailContent(personnel_name, username, password, announcingText);

    return content;
}

const baseEmailContent = (personnel_name: string, username: string, password: string, announcingText: string) => `
    <p>Thân gửi ${personnel_name},</p>
    <p>
        ${announcingText}
        Dưới đây là thông tin đăng nhập của bạn:
    </p>
    <ul>
        <li><strong>Tên tài khoản:</strong> ${username}</li>
        <li><strong>Mật khẩu tạm thời:</strong> ${password}</li>
    </ul>
    <p>
        Vì lý do bảo mật, bạn vui lòng đổi mật khẩu sau lần đăng nhập đầu tiên 
        để đảm bảo an toàn cho tài khoản của mình.
    </p>
    <p>
        Nếu bạn có bất kỳ thắc mắc hoặc cần hỗ trợ, vui lòng liên hệ với Admin 
        hoặc gửi email phản hồi qua 
        <a href="mailto:tech.etclub@gmail.com">tech.etclub@gmail.com</a>.
    </p>
    <p>Chúc bạn có những giây phút làm việc vui vẻ!</p>
    <p>
        Thân ái,<br />
        <strong>Ban chuyên môn | ET Club</strong>
    </p>
`;