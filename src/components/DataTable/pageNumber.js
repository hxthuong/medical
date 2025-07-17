export const pageNumber = (size, currentPage, totalPages) => {
    const half = Math.floor(size / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + size - 1, totalPages);
    // Nếu đang ở trang cuối và còn thiếu nút, lùi start lại
    if (end - start + 1 < size) {
        start = Math.max(end - size + 1, 1);
    }
    const pageNumbers = [];
    for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
    }

    return pageNumbers;
};
