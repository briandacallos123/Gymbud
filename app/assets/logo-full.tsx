import React from 'react'

type LogoFullProps = {
    isDashboard?: boolean;
}

const LogoFull = ({ isDashboard }: LogoFullProps) => {
    return (
        <svg width={isDashboard ? 300 : 300} height="100" viewBox="0 0 961 270" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M432.342 99.8949C432.127 99.0166 431.787 98.246 431.323 97.5831C430.859 96.9036 430.279 96.3319 429.583 95.8679C428.904 95.3873 428.108 95.031 427.197 94.799C426.302 94.5504 425.316 94.4261 424.239 94.4261C421.919 94.4261 419.938 94.9813 418.298 96.0916C416.674 97.2019 415.431 98.8011 414.569 100.889C413.724 102.977 413.301 105.496 413.301 108.446C413.301 111.429 413.707 113.981 414.519 116.102C415.331 118.223 416.541 119.848 418.148 120.974C419.756 122.101 421.753 122.665 424.139 122.665C426.244 122.665 427.992 122.358 429.384 121.745C430.793 121.132 431.845 120.262 432.541 119.135C433.237 118.008 433.585 116.682 433.585 115.158L435.972 115.406H424.338V105.562H446.909V112.622C446.909 117.262 445.923 121.231 443.951 124.529C441.996 127.81 439.294 130.329 435.847 132.086C432.417 133.826 428.481 134.696 424.04 134.696C419.085 134.696 414.735 133.644 410.989 131.539C407.244 129.434 404.319 126.435 402.214 122.54C400.126 118.646 399.082 114.014 399.082 108.645C399.082 104.436 399.72 100.707 400.996 97.4588C402.289 94.2107 404.079 91.468 406.366 89.2308C408.653 86.977 411.296 85.2784 414.295 84.1349C417.295 82.9749 420.51 82.3949 423.94 82.3949C426.956 82.3949 429.757 82.8258 432.342 83.6875C434.944 84.5327 437.239 85.7424 439.228 87.3168C441.233 88.8745 442.849 90.7223 444.075 92.8601C445.302 94.9979 446.047 97.3428 446.312 99.8949H432.342ZM448.873 83.0909H464.285L474.228 103.773H474.626L484.569 83.0909H499.981L481.288 117.991V134H467.566V117.991L448.873 83.0909ZM504.486 83.0909H521.688L533.52 111.926H534.117L545.949 83.0909H563.151V134H549.628V104.568H549.231L537.895 133.602H529.742L518.407 104.369H518.009V134H504.486V83.0909Z" fill="#FFCE00" />
            <path d="M386.281 200V149.091H408.355C412.233 149.091 415.489 149.613 418.124 150.657C420.776 151.701 422.773 153.176 424.115 155.082C425.474 156.987 426.153 159.233 426.153 161.818C426.153 163.691 425.739 165.398 424.911 166.939C424.098 168.48 422.955 169.773 421.48 170.817C420.005 171.844 418.282 172.557 416.31 172.955V173.452C418.497 173.535 420.486 174.09 422.276 175.117C424.065 176.128 425.491 177.528 426.551 179.318C427.612 181.091 428.142 183.179 428.142 185.582C428.142 188.366 427.413 190.844 425.955 193.015C424.513 195.186 422.458 196.893 419.79 198.136C417.122 199.379 413.94 200 410.244 200H386.281ZM400.102 188.963H406.565C408.885 188.963 410.625 188.532 411.786 187.67C412.946 186.792 413.526 185.5 413.526 183.793C413.526 182.599 413.252 181.589 412.705 180.76C412.158 179.931 411.379 179.302 410.369 178.871C409.374 178.44 408.173 178.224 406.764 178.224H400.102V188.963ZM400.102 169.673H405.77C406.98 169.673 408.049 169.483 408.977 169.102C409.905 168.72 410.625 168.174 411.139 167.461C411.67 166.732 411.935 165.845 411.935 164.801C411.935 163.227 411.371 162.025 410.244 161.197C409.117 160.352 407.692 159.929 405.969 159.929H400.102V169.673ZM463.167 149.091H476.988V181.705C476.988 185.582 476.06 188.938 474.204 191.772C472.364 194.589 469.796 196.768 466.498 198.31C463.2 199.834 459.372 200.597 455.013 200.597C450.622 200.597 446.777 199.834 443.479 198.31C440.182 196.768 437.613 194.589 435.773 191.772C433.951 188.938 433.039 185.582 433.039 181.705V149.091H446.86V180.511C446.86 182.086 447.208 183.494 447.904 184.737C448.6 185.964 449.561 186.925 450.788 187.621C452.031 188.317 453.439 188.665 455.013 188.665C456.604 188.665 458.013 188.317 459.239 187.621C460.466 186.925 461.427 185.964 462.123 184.737C462.819 183.494 463.167 182.086 463.167 180.511V149.091ZM503.145 200H483.557V149.091H502.946C508.183 149.091 512.707 150.11 516.518 152.148C520.346 154.17 523.296 157.087 525.368 160.898C527.456 164.693 528.5 169.242 528.5 174.545C528.5 179.848 527.464 184.406 525.393 188.217C523.321 192.012 520.388 194.929 516.593 196.967C512.798 198.989 508.315 200 503.145 200ZM497.378 188.267H502.648C505.166 188.267 507.313 187.861 509.086 187.049C510.876 186.237 512.234 184.837 513.162 182.848C514.107 180.859 514.579 178.092 514.579 174.545C514.579 170.999 514.099 168.232 513.138 166.243C512.193 164.254 510.801 162.854 508.961 162.042C507.139 161.23 504.901 160.824 502.25 160.824H497.378V188.267ZM562.338 165C562.205 163.343 561.584 162.05 560.473 161.122C559.38 160.194 557.714 159.73 555.477 159.73C554.052 159.73 552.883 159.904 551.972 160.252C551.077 160.584 550.414 161.039 549.983 161.619C549.552 162.199 549.329 162.862 549.312 163.608C549.279 164.221 549.387 164.776 549.635 165.273C549.9 165.754 550.315 166.193 550.878 166.591C551.442 166.972 552.163 167.32 553.041 167.635C553.919 167.95 554.963 168.232 556.173 168.48L560.349 169.375C563.166 169.972 565.578 170.759 567.583 171.737C569.588 172.714 571.229 173.866 572.505 175.192C573.781 176.501 574.717 177.976 575.314 179.616C575.927 181.257 576.242 183.047 576.258 184.986C576.242 188.333 575.405 191.167 573.748 193.487C572.09 195.807 569.721 197.572 566.638 198.782C563.572 199.992 559.885 200.597 555.576 200.597C551.152 200.597 547.29 199.942 543.993 198.633C540.711 197.324 538.159 195.31 536.336 192.592C534.53 189.858 533.618 186.361 533.602 182.102H546.727C546.81 183.66 547.199 184.969 547.895 186.03C548.591 187.09 549.569 187.894 550.828 188.441C552.105 188.988 553.621 189.261 555.377 189.261C556.852 189.261 558.087 189.079 559.081 188.714C560.076 188.35 560.83 187.844 561.343 187.198C561.857 186.552 562.122 185.814 562.139 184.986C562.122 184.207 561.865 183.527 561.368 182.947C560.888 182.351 560.092 181.821 558.982 181.357C557.872 180.876 556.372 180.429 554.483 180.014L549.412 178.92C544.904 177.943 541.349 176.31 538.748 174.023C536.162 171.72 534.878 168.58 534.895 164.602C534.878 161.371 535.74 158.545 537.48 156.126C539.236 153.69 541.664 151.792 544.763 150.433C547.879 149.074 551.45 148.395 555.477 148.395C559.587 148.395 563.141 149.083 566.141 150.458C569.141 151.834 571.452 153.772 573.076 156.275C574.717 158.761 575.546 161.669 575.562 165H562.338Z" fill="#FFCE00" />
            <path d="M677.838 66.9475C677.782 64.4566 679.333 60.7317 685.99 65.7587" stroke="#FFCE00" stroke-width="4" stroke-linecap="round" />
            <path d="M696.011 73.8554C695.955 71.3646 697.506 67.6396 704.163 72.6666" stroke="#FFCE00" stroke-width="4" stroke-linecap="round" />
            <path d="M686.841 70.7985C686.784 68.3076 688.335 64.5827 694.992 69.6096" stroke="#FFCE00" stroke-width="4" stroke-linecap="round" />
            <path d="M682.933 136.068C649.646 99.2492 601.584 131.143 607.868 163.92C607.245 164.373 606 166.298 606 170.374C607.359 176.828 605.321 184.81 615.68 196.528C644.382 224.21 669.007 207.906 676.819 206.887C683.069 206.072 691.311 203.378 694.651 202.132C713.842 202.132 730.711 204.85 735.241 189.225C750.356 137.087 744.775 140.993 743.562 136.068C740.788 124.803 735.241 101.932 735.241 100.574C735.241 98.8755 731.504 81.0434 730.655 75.6088C729.976 71.2612 726.636 68.5892 725.051 67.7966C723.183 66.438 713.672 64.0604 711.634 63.5509C710.785 63.3386 706.37 62.3621 705.181 62.0224C703.992 61.6827 673.423 56.418 671.894 56.0783C670.366 55.7387 668.328 56.418 667.139 59.8146C666.188 62.5319 662.553 75.0993 660.855 81.0434C661.195 84.6098 662.723 87.3271 665.61 87.3271C664.795 88.1423 664.931 92.7616 665.101 94.9694C665.441 95.5921 667.139 97.2452 671.215 98.8755C675.291 100.506 678.687 97.2905 679.876 95.4789C679.876 97.5169 683.612 98.1962 687.349 97.8565C688.979 99.4869 695.161 100.574 698.048 100.913C698.048 104.31 698.048 112.462 696.35 116.198C691.73 118.915 685.48 130.577 682.933 136.068Z" stroke="#FFCE00" stroke-width="8" />
            <path d="M677.668 61.6827C674.158 58.9089 667.784 55.7047 670.366 65.0793" stroke="#FFCE00" stroke-width="4" stroke-linecap="round" />
            <path d="M683.273 135.559C680.555 142.465 677.227 158.282 685.65 166.298" stroke="#FFCE00" stroke-width="6" stroke-linecap="round" />
            <path d="M662.893 167.487C653.892 172.469 632.052 178.798 616.699 164.26" stroke="#FFCE00" stroke-width="6" stroke-linecap="round" />
            <path d="M675.8 68.9854C676.14 69.3251 676.819 70.2761 676.819 71.3631C676.819 72.45 673.762 81.2132 672.234 85.4589" stroke="#FFCE00" stroke-width="7" stroke-linecap="round" />
            <path d="M691.425 77.3071C691.764 77.6468 692.444 78.5978 692.444 79.6847C692.444 80.7716 689.387 89.5349 687.858 93.7806" stroke="#FFCE00" stroke-width="7" stroke-linecap="round" />
            <path d="M683.952 73.9105C684.292 74.2502 684.971 75.2012 684.971 76.2881C684.971 77.375 681.914 86.1383 680.386 90.384" stroke="#FFCE00" stroke-width="7" stroke-linecap="round" />
            <path d="M735.734 186.056C736.357 177.338 737.229 159.121 735.734 155.996C734.24 152.872 738.282 163.412 740.489 169.073L735.734 186.056Z" stroke="#FFCE00" stroke-width="7" stroke-linecap="round" />
            <path d="M675.97 200.943L664.591 195.849C670.479 196.471 682.729 197.343 684.631 195.849C686.533 194.354 679.65 198.622 675.97 200.943Z" stroke="#FFCE00" stroke-width="7" stroke-linecap="round" />
            <path d="M283.731 67.9475C283.788 65.4566 282.237 61.7317 275.58 66.7587" stroke="#FFCE00" stroke-width="4" stroke-linecap="round" />
            <path d="M265.558 74.8554C265.615 72.3646 264.064 68.6396 257.406 73.6666" stroke="#FFCE00" stroke-width="4" stroke-linecap="round" />
            <path d="M274.729 71.7985C274.786 69.3076 273.234 65.5827 266.577 70.6096" stroke="#FFCE00" stroke-width="4" stroke-linecap="round" />
            <path d="M278.637 137.068C311.923 100.249 359.985 132.143 353.701 164.92C354.324 165.373 355.57 167.298 355.57 171.374C354.211 177.828 356.249 185.81 345.889 197.528C317.188 225.21 292.563 208.906 284.75 207.887C278.501 207.072 270.258 204.378 266.918 203.132C247.727 203.132 230.858 205.85 226.329 190.225C211.214 138.087 216.795 141.993 218.007 137.068C220.781 125.803 226.329 102.932 226.329 101.574C226.329 99.8755 230.065 82.0434 230.914 76.6088C231.594 72.2612 234.934 69.5892 236.519 68.7966C238.387 67.438 247.897 65.0604 249.935 64.5509C250.784 64.3386 255.2 63.3621 256.389 63.0224C257.578 62.6827 288.147 57.418 289.676 57.0783C291.204 56.7387 293.242 57.418 294.431 60.8146C295.382 63.5319 299.016 76.0993 300.714 82.0434C300.375 85.6098 298.846 88.3271 295.959 88.3271C296.774 89.1423 296.639 93.7616 296.469 95.9694C296.129 96.5921 294.431 98.2452 290.355 99.8755C286.279 101.506 282.882 98.2905 281.693 96.4789C281.693 98.5169 277.957 99.1962 274.221 98.8565C272.591 100.487 266.409 101.574 263.522 101.913C263.522 105.31 263.522 113.462 265.22 117.198C269.839 119.915 276.089 131.577 278.637 137.068Z" stroke="#FFCE00" stroke-width="8" />
            <path d="M283.901 62.6827C287.411 59.9089 293.785 56.7047 291.204 66.0793" stroke="#FFCE00" stroke-width="4" stroke-linecap="round" />
            <path d="M278.297 136.559C281.014 143.465 284.343 159.282 275.919 167.298" stroke="#FFCE00" stroke-width="6" stroke-linecap="round" />
            <path d="M298.676 168.487C307.677 173.469 329.518 179.798 344.87 165.26" stroke="#FFCE00" stroke-width="6" stroke-linecap="round" />
            <path d="M285.769 69.9854C285.43 70.3251 284.75 71.2761 284.75 72.3631C284.75 73.45 287.807 82.2132 289.336 86.4589" stroke="#FFCE00" stroke-width="7" stroke-linecap="round" />
            <path d="M270.145 78.3071C269.805 78.6468 269.126 79.5978 269.126 80.6847C269.126 81.7716 272.183 90.5349 273.711 94.7806" stroke="#FFCE00" stroke-width="7" stroke-linecap="round" />
            <path d="M277.618 74.9105C277.278 75.2502 276.599 76.2012 276.599 77.2881C276.599 78.375 279.656 87.1383 281.184 91.384" stroke="#FFCE00" stroke-width="7" stroke-linecap="round" />
            <path d="M225.835 187.056C225.213 178.338 224.341 160.121 225.835 156.996C227.33 153.872 223.288 164.412 221.08 170.073L225.835 187.056Z" stroke="#FFCE00" stroke-width="7" stroke-linecap="round" />
            <path d="M285.6 201.943L296.978 196.849C291.091 197.471 278.84 198.343 276.938 196.849C275.036 195.354 281.92 199.622 285.6 201.943Z" stroke="#FFCE00" stroke-width="7" stroke-linecap="round" />
        </svg>

    )
}

export default LogoFull