import type { Question } from "../types";

// JSM(Jira Service Management) 학습용 문제 45개
export const jsmSet1Questions: Question[] = [
  {
    id: "jsm1-1",
    question: "Which action can customers take when viewing the request list on the customer portal?",
    options: ["Add a priority", "Change the Reporter", "Filter list by project", "Change list columns"],
    answerIndexes: [3],
    explanation:
      "고객은 요청 목록에서 Edit list view로 표시할 컬럼을 편집하고 순서를 바꿀 수 있어요(선택 가능한 컬럼은 관리자가 정한 범위 내). 고객은 상태·역할(요청자/참여자)·조직·요청 유형으로 필터링은 가능하지만 프로젝트별 필터는 없습니다.\n오답: 우선순위 지정과 Reporter 변경은 에이전트 전용 기능이고, 프로젝트 필터는 현재 제공되지 않아요.",
  },
  {
    id: "jsm1-2",
    question: "Ann is an agent and Clara is a customer. Which action can be performed only by Ann?",
    options: ["Cancel a ticket", "View an object graph", "Search for an article", "Submit a form"],
    answerIndexes: [1],
    explanation:
      "Object graph는 Assets 기능에서 오브젝트 관계를 시각화하는 에이전트 전용 화면이에요. 취소·문서 검색·요청 제출은 고객도 포털에서 할 수 있는 셀프서비스 동작입니다.",
  },
  {
    id: "jsm1-3",
    question: "An agent needs to directly cancel a ticket. What action should the agent take?",
    options: [
      "Set the value in the Resolution field",
      "Select \"Cancel\" from the Status dropdown",
      "Update the request type of the ticket",
      "Comment on the ticket that it should be closed",
    ],
    answerIndexes: [1],
    explanation:
      "JSM에서 요청 상태 변경은 워크플로 전환(transition)으로 하며, 에이전트는 Status 드롭다운에서 Cancel을 선택해 직접 취소합니다. Resolution 필드는 전환 시 함께 지정되는 값일 뿐이고, Request type 변경은 상태와 무관하며, 댓글은 상태를 바꾸지 않아요.",
  },
  {
    id: "jsm1-4",
    question: "Which is NOT a valid way to change the status of a ticket?",
    options: [
      "Via a queue",
      "Via the customer portal",
      "Via the project board",
      "Via an automation rule",
      "Via the change calendar",
    ],
    answerIndexes: [4],
    explanation:
      "Change calendar는 예정된 변경 요청의 일정을 보여주는 계획용 화면으로 상태 전환 기능이 없어요. 큐·포털·보드·자동화 규칙은 모두 상태를 전환할 수 있는 방법입니다.",
  },
  {
    id: "jsm1-5",
    question: "Which statement is true only about forms and not about request types?",
    options: [
      "They can include conditional logic",
      "They are listed in portal groups",
      "They may contain paragraph fields",
      "They may contain customer fields",
    ],
    answerIndexes: [0],
    explanation:
      "폼은 응답에 따라 질문을 보이거나 숨기는 조건부 로직을 지원하지만, 요청 유형 필드는 이런 동적 기능이 기본으로 없어요. 포털 그룹에 나열되는 건 요청 유형이고, Paragraph 필드는 요청 유형에도 있을 수 있어 폼만의 특징이 아니에요.",
  },
  {
    id: "jsm1-6",
    question: "Which setting will NOT affect the discoverability of an article in the customer portal?",
    options: ["Article categories", "Article labels", "Featured flag", "Page emoji", "Page restrictions"],
    answerIndexes: [3],
    explanation:
      "페이지 이모지는 제목 옆 장식 요소일 뿐 검색·노출에 영향이 없어요. 카테고리·라벨·Featured 표시·페이지 제한은 모두 문서가 포털에서 발견되는 데 영향을 줍니다.",
  },
  {
    id: "jsm1-7",
    question: "Which queue-related action can agents perform?",
    options: [
      "Create and configure a new queue based on personal preferences",
      "Sort and filter tickets within their assigned queues to prioritize work",
      "Modify the criteria that determines which tickets appear in queues",
      "Delete queues that are no longer needed",
    ],
    answerIndexes: [1],
    explanation:
      "에이전트는 큐 안의 티켓을 정렬·필터링해 우선순위를 정할 수 있어요(큐를 '사용'). 큐 생성·기준(JQL) 수정·삭제는 모두 '구성'하는 작업이라 관리자 권한이 필요합니다.",
  },
  {
    id: "jsm1-8",
    question:
      "Two tickets are created that meet the same criteria for an SLA. One was created in the middle of the night and the other just before the start of business. Nothing further happens to either ticket but they breach after different amounts of time. What explains this difference in behavior?",
    options: ["The start condition", "The pause condition", "The stop condition", "The calendar", "The time target"],
    answerIndexes: [3],
    explanation:
      "SLA는 업무 시간 캘린더 기준으로 시간을 계산해요. 한밤중에 생성된 티켓은 업무 시작 전까지 시계가 돌지 않아 위반 시점이 달라집니다. 시작 조건과 목표 시간은 두 티켓에 동일하고, '아무 일도 없었다'는 조건상 pause/stop은 해당하지 않아요.",
  },
  {
    id: "jsm1-9",
    question:
      "Customers are creating a lot of requests rather than consulting the knowledge base. The team would like to see the performance of knowledge base articles. Which out-of-box report provides this information?",
    options: ["Requests deflected", "Workload report", "Service requests", "SLA Success Rate"],
    answerIndexes: [0],
    explanation:
      "Requests deflected 리포트는 고객이 문서를 보고 요청 생성 없이 해결한 비율을 보여줘서 지식 베이스 성과 확인에 적합해요. Workload는 에이전트 업무량, Service requests는 요청 건수 추이, SLA Success Rate는 SLA 달성률을 보여줄 뿐 문서 성과와는 무관합니다.",
  },
  {
    id: "jsm1-10",
    question:
      "An agent needs to view tickets where the Time to Resolution SLA has breached. Which location would definitely NOT include this information?",
    options: ["Satisfaction Report", "Team dashboard", "Queues", "Custom report"],
    answerIndexes: [0],
    explanation:
      "Satisfaction report는 고객 만족도(CSAT) 평점을 보여줄 뿐 SLA 위반 정보를 다루지 않아요. 팀 대시보드·큐·커스텀 리포트는 설정에 따라 SLA 위반 티켓을 확인할 수 있습니다.",
  },
  {
    id: "jsm1-11",
    question: "Which role can definitely view service project reports?",
    options: ["Approvers", "Agents", "Customers", "Request participants"],
    answerIndexes: [1],
    explanation:
      "서비스 프로젝트 리포트는 에이전트가 기본적으로 확실히 볼 수 있어요. 승인자는 역할이 아니라 요청마다 지정되는 사람이라 '확실히'라고 할 수 없고, 고객과 요청 참여자는 리포트 화면에 접근하지 못합니다.",
  },
  {
    id: "jsm1-12",
    question:
      "Agents can use functionality within Jira Service Management that is specially designed to track inventory, such as licenses for thousands of products in the service catalogue. Identify this functionality.",
    options: ["Assets objects", "Label fields", "Request types", "Internal forms"],
    answerIndexes: [0],
    explanation:
      "Assets는 자산·재고·라이선스를 오브젝트로 저장·관리하는 JSM 기능이에요. 라벨은 분류 태그, 요청 유형은 요청 정의, 내부 폼은 정보 수집용일 뿐 재고 관리 기능이 아닙니다.",
  },
  {
    id: "jsm1-13",
    question:
      "While looking at his ticket, agent Martin determines that it poses a severe disruption and requires an urgent response. He should use a feature specially designed to visually distinguish the ticket and move it to a dedicated queue. What should he do?",
    options: [
      "Turn on the Major incident toggle",
      "Create an alert",
      "Transition to Escalated",
      "Edit the Impact level",
    ],
    answerIndexes: [0],
    explanation:
      "Major incident 토글을 켜면 인시던트가 시각적으로 구분되고 전용 Major incidents 큐에 모아서 보여요. Alert는 온콜 알림용, Escalated 전환은 단순 상태 변경, Impact 편집은 필드값 변경일 뿐 시각적 구분이나 전용 큐와 무관합니다.",
  },
  {
    id: "jsm1-14",
    question:
      "Incoming requests are automatically assigned to an agent as soon as their queue falls below ten requests. What is causing this?",
    options: ["Queue configuration", "Automation rule", "Board columns", "On-call schedule"],
    answerIndexes: [1],
    explanation:
      "조건 충족 시 자동으로 담당자를 지정하는 동작은 자동화 규칙이 하는 일이에요. 큐 설정은 단순히 티켓을 보여주는 목록 구성이고, 보드 컬럼은 상태 구분, 온콜 일정은 알림 대상자를 정할 뿐 티켓을 자동 배정하지 않습니다.",
  },
  {
    id: "jsm1-15",
    question: "Which action was definitely performed by a human agent versus the virtual agent in Jira Service Management?",
    options: ["A Slack response", "An article suggestion", "An On-call schedule review", "A service request creation"],
    answerIndexes: [2],
    explanation:
      "온콜 일정 검토는 사람이 하는 업무로 가상 에이전트는 수행하지 않아요. Slack 응답, 문서 추천, 요청 생성은 모두 가상 에이전트가 할 수 있는 동작입니다.",
  },
  {
    id: "jsm1-16",
    question:
      "An agent observes that the 'Urgency' field is visible on the internal ticket view but was not presented to the user during ticket creation on the Help Center. Which configuration object primarily determines which fields are visible to the customer when they submit a specific request?",
    options: [
      "Field Configuration Scheme",
      "Issue Type Screen Scheme",
      "Request Type configuration",
      "Workflow Status properties",
    ],
    answerIndexes: [2],
    explanation:
      "포털에서 고객에게 보이는 필드는 요청 유형의 구성(Request form)에서 결정돼요. Field Configuration Scheme은 필수·숨김 설정, Issue Type Screen Scheme은 이슈 타입별 화면 연결, Workflow Status properties는 상태 속성이라 필드 표시와는 무관합니다.",
  },
  {
    id: "jsm1-17",
    question:
      "A service desk team wants to reduce the manual effort required to manage tickets that have been in the 'Waiting for Customer' status for over 10 days. Which productivity tool should be configured to automatically close these tickets?",
    options: ["Bulk Operation wizard", "SLA goal calendars", "Automation for Jira", "Atlassian Intelligence generative replies"],
    answerIndexes: [2],
    explanation:
      "특정 상태로 일정 기간 머문 티켓을 자동으로 닫는 건 조건 기반 자동화 규칙의 대표 사례예요. Bulk Operation은 사람이 수동 실행, SLA 캘린더는 시간 계산용, AI 생성 답변은 초안 작성 기능이라 자동 종료와 무관합니다.",
  },
  {
    id: "jsm1-18",
    question:
      "An agent is currently viewing the queues in a Jira Service Management project and needs to quickly access a specific space in Confluence to update documentation. Which two methods allow the agent to navigate to the Confluence application? (Select Two)",
    options: [
      "Select 'Knowledge base' from the project sidebar and click the link to the connected space",
      "Open the 'Your work' dropdown and select 'Confluence Pages'",
      "Click the App switcher icon in the top navigation bar and select Confluence",
      "Type 'Confluence' in the project settings search bar",
      "Click the Jira logo to return to the dashboard and look for the Confluence gadget",
    ],
    answerIndexes: [0, 2],
    explanation:
      "지식 베이스 메뉴에서 연결된 Confluence 스페이스로 바로 이동할 수 있고, 상단 앱 전환(App switcher)에서도 Confluence를 선택할 수 있어요. 'Your work' 드롭다운엔 Confluence Pages 항목이 없고, 프로젝트 설정 검색창은 설정 항목 검색용이며, 대시보드에 그런 가젯은 없습니다.",
  },
  {
    id: "jsm1-19",
    question:
      "A customer submits a request regarding a software bug containing sensitive proprietary data. The handling agent needs to discuss technical reproduction steps with a development team member without triggering any notifications to the customer. Which comment type must the agent use?",
    options: ["Internal note", "Private log", "Reply to customer", "Restricted comment"],
    answerIndexes: [0],
    explanation:
      "Internal note는 고객에게 보이지 않고 알림도 가지 않는 내부 전용 댓글이에요. Private log는 JSM에 없는 기능, Reply to customer는 고객에게 보이고 알림이 가며, Restricted comment는 일반 Jira의 제한 기능이라 JSM 요청에선 Internal note를 씁니다.",
  },
  {
    id: "jsm1-20",
    question:
      "While viewing a queue, an agent notices a ticket where the 'Time to resolution' SLA timer is displayed in red with a negative value (e.g., -25m). What does this specific visual indicator confirm about the status of the service level agreement?",
    options: [
      "The SLA target time has been exceeded (breached)",
      "The SLA is at risk and will breach in 25 minutes",
      "The SLA is currently paused due to the ticket status",
      "The SLA has been met but requires final verification",
    ],
    answerIndexes: [0],
    explanation:
      "빨간색 마이너스 시간은 목표 시간을 이미 초과했다는 뜻이에요(-25m = 25분 초과). 위반 임박은 양수로 표시되고, 일시 정지는 타이머가 멈춘 모습으로 표시되며, '충족 후 확인 필요'라는 개념은 없습니다.",
  },
  {
    id: "jsm1-21",
    question:
      "A software developer needs to assist the IT Service Desk by reviewing code attached to incidents and leaving internal notes, but they do not hold a Jira Service Management license. Which role best describes this user's access within the Service Project context?",
    options: ["Collaborator", "Project Administrator", "Service Desk Agent", "Customer"],
    answerIndexes: [0],
    explanation:
      "Collaborator는 JSM 라이선스 없이 Jira 라이선스만으로 이슈·첨부를 보고 내부 댓글을 남길 수 있는 역할이에요. Project Administrator·Service Desk Agent는 JSM 라이선스가 필요하고, Customer는 포털로 요청을 제출하는 역할입니다.",
  },
  {
    id: "jsm1-22",
    question:
      "To minimize inbound ticket volume during a widespread outage, an agent wants to update the public incident linked to the active major incident so its notice can appear on the customer portal. Which integration feature enables this action?",
    options: [
      "The Automation for Jira rule builder",
      "The Statuspage panel in the issue view",
      "The Announcement Banner settings",
      "The Customer Notification scheme",
    ],
    answerIndexes: [1],
    explanation:
      "이슈 화면의 Statuspage 패널에서 연결된 공개 인시던트를 업데이트해 고객에게 장애 공지를 알릴 수 있어요. 자동화 규칙 빌더는 규칙 제작 도구, Announcement Banner는 관리자가 설정하는 별도 배너, Customer Notification scheme은 알림 설정이라 Statuspage 공개 인시던트와는 무관합니다.",
  },
  {
    id: "jsm1-23",
    question:
      "A customer claims to have submitted a request via the portal, and you have verified the ticket exists by searching for its Issue Key. However, the ticket is not appearing in the 'All Open' queue that your team uses to triage work. What is the most likely technical reason for this visibility issue?",
    options: [
      "The queue's configured criteria exclude the ticket's current status or issue type",
      "The ticket is currently assigned to another agent, hiding it from your view",
      "The customer marked the ticket as 'Private' in the portal",
      "You have not starred the ticket, so it does not appear in general queues",
    ],
    answerIndexes: [0],
    explanation:
      "큐는 JQL 기준에 맞는 티켓만 보여줘서, 상태나 이슈 타입이 기준에서 제외되면 티켓이 존재해도 큐에 나타나지 않아요. 담당자가 달라도 숨겨지지 않고, 포털에 'Private' 표시 기능은 없으며, 별표는 큐 즐겨찾기용이라 티켓 노출과 무관합니다.",
  },
  {
    id: "jsm1-24",
    question:
      "Which specific actions can be performed by an Automation rule to assist an agent immediately after a high-priority incident is created? (Select Two)",
    options: [
      "Reset the reporter's password to prevent security breaches",
      "Archive the project to prevent further ticket creation",
      "Send a notification message to a specific team channel in Microsoft Teams or Slack",
      "Restart the Jira Cloud instance to ensure performance",
      "Auto-assign the issue to the correct team member based on an on-call schedule",
    ],
    answerIndexes: [2, 4],
    explanation:
      "자동화 규칙은 Slack/Teams로 알림 메시지를 보내고, 온콜 일정 기준으로 담당자를 자동 지정할 수 있어요. 비밀번호 초기화, 프로젝트 보관, 인스턴스 재시작은 자동화 규칙의 기능이 아니고 현실적이지도 않습니다.",
  },
  {
    id: "jsm1-25",
    question:
      "An agent shares a link to a knowledge base article in a comment, but the customer reports receiving a 'Permission Denied' error when clicking it. What is the most likely cause of this issue?",
    options: [
      "The agent did not use the official 'Share' button to generate the link",
      "The customer is using a mobile device to access the help center",
      "The customer is not listed as a Request Participant on the ticket",
      "The article's viewing permissions are restricted to internal agents only",
    ],
    answerIndexes: [3],
    explanation:
      "문서의 열람 권한이 내부 에이전트로 제한되어 있으면 고객은 링크를 열 때 권한 오류를 만나요. 링크 생성 방식, 모바일 접속, 요청 참여자 여부는 권한 오류의 원인이 아닙니다.",
  },
  {
    id: "jsm1-26",
    question:
      "Which two conditions must be met for an agent to successfully create a new knowledge base article directly from within a Jira Service Management issue? (Select Two)",
    options: [
      "The 'kb-how-to' label must be pre-configured in the project settings",
      "The Jira issue must be in a 'Resolved' or 'Closed' status",
      "The agent must be a Project Administrator in Jira Service Management",
      "The agent must have a license for Confluence with permission to create pages in the linked space",
      "The service project must be linked to a Confluence space",
    ],
    answerIndexes: [3, 4],
    explanation:
      "이슈에서 문서를 만들려면 프로젝트가 Confluence 스페이스에 연결돼 있어야 하고, 에이전트가 그 스페이스에 페이지를 만들 Confluence 라이선스·권한이 있어야 해요. 특정 라벨 사전 설정, 이슈 상태(해결/종료), 프로젝트 관리자 권한은 조건이 아닙니다.",
  },
  {
    id: "jsm1-27",
    question:
      "Which of the following details are directly visible to an agent on the main On-call schedule timeline without navigating to additional settings pages? (Select Two)",
    options: [
      "The complete audit log of all schedule modifications",
      "The start and end times of specific shifts",
      "The API key used for the Opsgenie integration",
      "The credit card billing details for SMS notifications",
      "The names of the individuals currently assigned to the rotation",
    ],
    answerIndexes: [1, 4],
    explanation:
      "온콜 일정 타임라인에서는 근무의 시작·종료 시간과 현재 로테이션에 배정된 사람들의 이름을 바로 볼 수 있어요. 감사 로그, API 키, 결제 정보는 각각 별도의 설정·보안·청구 화면에서 확인합니다.",
  },
  {
    id: "jsm1-28",
    question:
      "A report displays a Customer Satisfaction score of 4.5/5 based on 10 reviews. When calculating the average, how does the report treat a text comment with no associated star rating on a resolved ticket?",
    options: [
      "It prevents the ticket from being listed in the satisfaction report",
      "It is treated as a zero rating and lowers the average score",
      "It is excluded from the quantitative average calculation entirely",
      "It counts as a neutral 3-star rating in the final calculation",
    ],
    answerIndexes: [2],
    explanation:
      "평균은 별점이 있는 평가로만 계산되고, 별점 없는 텍스트 댓글은 평균 계산에서 제외돼요. 티켓이 리포트에서 사라지거나 0점·3점으로 처리되지 않습니다.",
  },
  {
    id: "jsm1-29",
    question: "An agent wants to check how a posted response appears to the requester in the help center. Which feature allows this?",
    options: ["Preview comment mode", "Customer view toggle", "Audit log review", "View request in portal"],
    answerIndexes: [3],
    explanation:
      "'View request in portal'로 해당 요청이 고객에게 포털에서 어떻게 보이는지 바로 확인할 수 있어요. Preview comment mode와 Customer view toggle은 JSM에 없는 기능이고, Audit log는 변경 이력을 보는 기능입니다.",
  },
  {
    id: "jsm1-30",
    question:
      "While reviewing a list of tickets in the 'Resolved' queue, an agent notices that a specific ticket listed as 'Resolved' does not have a strike-through on its ID and is skewing open ticket reports. What is the most likely cause of this discrepancy?",
    options: [
      "The agent does not have permission to close tickets",
      "The ticket was reopened by a customer comment",
      "The Resolution field was not set during the transition to Resolved",
      "The status category is set to 'In Progress' instead of 'Done'",
    ],
    answerIndexes: [2],
    explanation:
      "이슈 키의 취소선은 Resolution 필드에 값이 있을 때 표시돼요. 상태가 Resolved여도 Resolution이 비어 있으면 Jira는 미해결로 취급해 열린 티켓 리포트에 포함됩니다. 닫기 권한, 재오픈, 상태 카테고리는 이 현상과 직접 관련이 없습니다.",
  },
  {
    id: "jsm1-31",
    question:
      "You are assigned to a Service Project that contains over fifty different queues, making it difficult to quickly access the three specific lists you monitor daily. Which action allows you to pin these high-priority lists to a dedicated section at the top of your sidebar navigation?",
    options: [
      "Modify the queue settings to increase their display ranking",
      "Click the star icon next to the name of each relevant queue",
      "Drag and drop the queues to the top of the category list",
      "Create a personal filter subscription for each list",
    ],
    answerIndexes: [1],
    explanation:
      "큐 이름 옆 별 아이콘을 누르면 즐겨찾기로 등록되어 사이드바 상단에 고정돼요. 표시 순위 변경은 프로젝트 전체 설정이고, 개인이 드래그로 순서를 바꾸는 방식이 아니며, 필터 구독은 알림용입니다.",
  },
  {
    id: "jsm1-32",
    question:
      "While reviewing a support request, you identify a knowledge base article that perfectly addresses the user's problem. You want to provide a direct link to this article within a new comment. Which method allows you to do this most efficiently from the issue view?",
    options: [
      "Hover over the article in the Knowledge base panel and select the 'Share as comment' icon",
      "Export the article to PDF and attach it to the request",
      "Use the 'Link issue' dialog and select 'Confluence Page'",
      "Copy the URL from a separate browser tab and paste it into the description",
    ],
    answerIndexes: [0],
    explanation:
      "이슈 화면의 Knowledge base 패널에서 문서를 찾아 공유 아이콘으로 바로 댓글에 링크를 넣는 방식이 가장 효율적이에요. PDF 첨부, Link issue, URL 복사-붙여넣기는 모두 번거롭거나 용도가 다릅니다.",
  },
  {
    id: "jsm1-33",
    question:
      "The 'Time to Resolution' timer is running on an incident that requires additional information from the reporting user. Which action by the agent will pause the SLA timer, assuming default Jira Service Management configuration?",
    options: [
      "Assigning the ticket to the reporting user",
      "Transitioning the ticket to a status configured to pause the timer, such as 'Waiting for customer'",
      "Adding an internal note tagging the user",
      "Editing the SLA field to manually pause the countdown",
    ],
    answerIndexes: [1],
    explanation:
      "SLA 타이머는 일시 정지 조건으로 설정된 상태(Waiting for customer 등)로 전환하면 멈춰요. 담당자 변경과 내부 노트는 정지 조건이 아니고, SLA를 수동으로 멈추는 필드는 없습니다.",
  },
  {
    id: "jsm1-34",
    question:
      "An agent is drafting a new article that details a workaround for a software bug, but the article must effectively reach users searching for various synonyms like 'crash', 'freeze', and 'unresponsive'. Which method is the most appropriate way to achieve this without cluttering the article title?",
    options: [
      "Create duplicate articles with different titles for each synonym",
      "Update the Project Settings to map these keywords to the article ID",
      "Add each synonym as a separate label to the knowledge base article",
      "Add the synonyms as hidden text in the footer of the article",
    ],
    answerIndexes: [2],
    explanation:
      "라벨은 검색에 반영되는 키워드 역할을 해서 제목을 어지럽히지 않고도 동의어로 검색한 고객에게 문서를 노출시킬 수 있어요. 중복 문서 생성, 키워드-ID 매핑 설정, 숨김 텍스트는 비효율적이거나 지원되지 않는 방법입니다.",
  },
  {
    id: "jsm1-35",
    question: "Select two distinct capabilities of Atlassian Intelligence that help agents efficiently resolve support tickets. (Select Two)",
    options: [
      "Deleting user accounts that have been inactive for 90 days",
      "Summarizing long comment threads and issue descriptions",
      "Automatically creating new Jira projects based on request types",
      "Providing generative AI suggestions to improve response tone",
      "Generating financial audit reports for the billing department",
    ],
    answerIndexes: [1, 3],
    explanation:
      "Atlassian Intelligence는 긴 댓글·설명을 요약하고 답변 톤을 다듬는 제안을 제공해 처리 속도를 높여줘요. 계정 삭제, 프로젝트 자동 생성, 재무 감사 리포트 생성은 AI의 기능이 아닙니다.",
  },
  {
    id: "jsm1-36",
    question:
      "Several users report the same connection error, and an agent identifies a master ticket that tracks the root cause. The agent wants to link the individual user reports to this master ticket so the relationship is clear. Which option allows the agent to establish this relationship?",
    options: [
      "Edit the 'Components' field on the master ticket",
      "Use the 'Link work items' feature to select 'is caused by' or 'relates to' on each report",
      "Merge the tickets using the 'Clone' operation",
      "Add the master ticket ID to the 'Labels' field of the user reports",
    ],
    answerIndexes: [1],
    explanation:
      "티켓 간 관계는 Link work items 기능으로 'is caused by', 'relates to' 같은 링크 유형을 선택해 연결해요. Components는 분류 필드, Clone은 복제 기능이라 병합이 아니며, 라벨에 ID를 적는 건 공식적인 연결 방식이 아닙니다.",
  },
  {
    id: "jsm1-37",
    question:
      "An agent is investigating a critical incident and needs to log technical details about a server restart for the operations team. It is crucial that the customer does not see this technical jargon in their portal view. Which feature should the agent use to record this information?",
    options: [
      "Update the ticket description",
      "Reply to customer",
      "Add an internal note",
      "Add a comment and restrict to 'Service Desk Customers'",
    ],
    answerIndexes: [2],
    explanation:
      "Internal note는 고객에게 보이지 않아서 기술 내용을 내부 팀에게만 공유할 수 있어요. 설명(description)과 Reply to customer는 고객도 볼 수 있는 영역이고, 'Service Desk Customers'로 제한하면 오히려 고객에게 공개됩니다.",
  },
  {
    id: "jsm1-38",
    question:
      "An agent successfully resolves a complex incident and wants to document the solution for future reference directly from the issue view. Which action allows the agent to generate a new Confluence page populated with the issue's summary and description?",
    options: [
      "Click the 'Link page' button and select 'New' from the dropdown",
      "Select 'Create article' from the knowledge base panel in the issue view",
      "Add the 'kb-article' label to the issue to trigger an automation rule",
      "Choose 'Export to Confluence' from the issue actions menu",
    ],
    answerIndexes: [1],
    explanation:
      "Knowledge base 패널의 Create article을 누르면 이슈의 요약·설명이 미리 채워진 Confluence 페이지가 생성돼요. Link page는 기존 페이지 연결용이고, 라벨 기반 자동 생성이나 Export to Confluence 메뉴는 기본 제공되지 않습니다.",
  },
  {
    id: "jsm1-39",
    question:
      "A software developer holds a Jira Software license and has been added to a Jira Service Management project's Service Desk Team (becoming a collaborator). When this developer views a request within that project, which action are they authorized to perform?",
    options: [
      "Edit the SLA goals associated with the request",
      "Transition the issue to a new status in the workflow",
      "Post a public comment visible to the customer",
      "Add an internal note not visible to the customer",
    ],
    answerIndexes: [3],
    explanation:
      "Collaborator는 이슈·댓글·첨부를 보고 내부 댓글을 추가할 수 있어요. SLA 목표 편집은 관리자 설정이고, 상태 전환과 고객에게 보이는 공개 댓글은 JSM 라이선스가 있는 에이전트만 할 수 있습니다.",
  },
  {
    id: "jsm1-40",
    question:
      "While onboarding a new help desk team member, the administrator grants them the 'Service Desk Team' project role but forgets to assign a Jira Service Management product license. The user also has a Jira Software license and Browse Projects permission. What specific limitation will this user encounter when accessing the project?",
    options: [
      "They will be unable to use the search bar to find tickets",
      "They will be unable to see the Queues link in the project sidebar",
      "They will be unable to view any issues within the project",
      "They will be unable to log in to the Atlassian site entirely",
    ],
    answerIndexes: [1],
    explanation:
      "JSM 라이선스가 없으면 Collaborator로 취급되어 큐·리포트·SLA 같은 서비스 프로젝트 전용 화면에 접근할 수 없어요. 검색과 이슈 열람은 가능하고, Jira Software 라이선스가 있어 로그인도 가능합니다.",
  },
  {
    id: "jsm1-41",
    question:
      "To ensure critical incidents are addressed immediately, a project lead wants a message to be posted to a specific Microsoft Teams channel whenever a ticket with 'Priority = Highest' is created. Which feature is capable of satisfying this requirement?",
    options: ["Automation for Jira", "Customer Portal settings", "Atlassian Intelligence", "Notification Schemes"],
    answerIndexes: [0],
    explanation:
      "조건(생성 + Highest 우선순위) 충족 시 외부 채널로 메시지를 보내는 동작은 자동화 규칙으로 구성해요. 포털 설정은 고객 접근 설정, AI는 지원 기능, 알림 스킴은 이메일 알림용이라 Teams 메시지 전송과는 무관합니다.",
  },
  {
    id: "jsm1-42",
    question:
      "While viewing the \"All Open Requests\" queue, you notice the tickets are currently ordered by Priority, but you need to identify which requests were submitted most recently. How can you temporarily reorder the current view to show the newest tickets at the top?",
    options: [
      "Change the JQL query in the queue configuration settings",
      "Apply a \"Date Created\" quick filter from the top menu",
      "Sort by Created in descending order using the column header",
      "Switch to the \"Newest First\" system preset queue",
    ],
    answerIndexes: [2],
    explanation:
      "컬럼 헤더에서 Created를 내림차순 정렬하면 큐 설정을 바꾸지 않고 현재 화면만 임시로 순서를 바꿀 수 있어요. JQL 수정은 큐 설정 자체를 바꾸는 관리자 작업이고, 'Date Created' 빠른 필터나 'Newest First' 시스템 큐는 제공되지 않습니다.",
  },
  {
    id: "jsm1-43",
    question:
      "A help desk team requires that all 'Troubleshooting' articles follow a strict format including 'Problem Description', 'Root Cause', and 'Resolution Steps'. How can an agent best ensure consistency when creating a new article from a Jira issue?",
    options: [
      "Create a Jira automation rule that pre-fills the description field of the issue",
      "Manually type these headers every time a new article is created",
      "Copy and paste the format from an existing article into the new blank page",
      "Select a 'Troubleshooting' template configured with those headings during article creation",
    ],
    answerIndexes: [3],
    explanation:
      "미리 구성된 템플릿을 선택하면 모든 문서가 같은 형식을 자동으로 따르게 돼요. 이슈 설명 미리 채우기, 수동 입력, 복사-붙여넣기는 서식 일관성을 보장하지 못합니다.",
  },
  {
    id: "jsm1-44",
    question:
      "A Service Desk Manager is building a custom report to compare the \"Time to resolution\" performance of the \"Hardware Support\" team against the \"Software Support\" team on a single line chart. After selecting the \"Time to resolution\" metric, what configuration step is required to visualize the performance of these two teams as distinct lines?",
    options: [
      "Add a \"Split\" parameter to the primary data source configuration",
      "Add two separate Series, each filtered to one team's requests",
      "Apply a \"Group By\" parameter using the \"Assignment Group\" field",
      "Configure the \"Chart Type\" to \"Stacked Area\" with a team breakdown",
    ],
    answerIndexes: [1],
    explanation:
      "커스텀 리포트는 시리즈 단위로 선을 구성해서, 비교 대상마다 시리즈를 추가하고 각각 JQL로 필터링하면 서로 다른 선으로 표시돼요. Split이나 Group By 같은 구성 항목은 없고, Stacked Area는 두 개의 선으로 비교하는 요구와 맞지 않습니다.",
  },
  {
    id: "jsm1-45",
    question:
      "You are working on a high-priority incident that has an active 'Time to first response' SLA. Which of the following actions will typically satisfy this SLA and stop the timer? (Select Two)",
    options: [
      "Adding an internal note for the team",
      "Posting a public comment visible to the customer",
      "Assigning the ticket to another agent",
      "Changing the priority level of the ticket",
      "Transitioning the issue to a status configured to indicate that a first response was sent and to stop the timer",
    ],
    answerIndexes: [1, 4],
    explanation:
      "첫 응답 SLA는 고객에게 보이는 공개 댓글을 달거나, 정지 조건으로 설정된 상태로 전환할 때 충족돼요. 내부 노트는 고객에게 보이지 않아 첫 응답으로 인정되지 않고, 담당자·우선순위 변경은 정지 조건이 아닙니다.",
  },
];
