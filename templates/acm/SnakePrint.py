def snake_print(matrix):
    L = len(matrix[0])
    W = len(matrix)
    sum = 0
    i = 0
    j = 0
    while sum <= L + W - 2:
        while i <= sum and j <= sum:
            j = sum - i
            if j < L:
                # print(matrix[i][j])
                print(i, j)
            if sum % 2 == 0:
                i -= 1
            else:
                i += 1
            if i < 0:
                i = 0
                break
            if i == W:
                i = W-1
                break
        sum += 1


snake_print([[1, 2, 3, 4, 5,6,7], [8, 9, 10,11,12,13,14], [15,16,17,18,19,20,21]])