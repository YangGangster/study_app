import type { Question } from "../types";

// JSM(Jira Service Management) 학습용 문제 30개 (세트 2)
export const jsmSet2Questions: Question[] = [
  {
    id: "jsm2-1",
    question:
      "A project administrator created a new 'Laptop Replacement' request type, but customers report that they cannot find it on the customer portal. Agents can still select it when creating a ticket internally. What is the most likely cause?",
    options: [
      "The request type has no SLA goal configured",
      "The request type is not assigned to any portal group",
      "The workflow for the request type has no 'Open' status",
      "The customers do not have a Jira Service Management license",
    ],
    answerIndexes: [1],
    explanation:
      "Request Type을 만들었다고 자동으로 포털에 노출되는 것은 아니며, Portal Group에 배정해야 고객이 찾을 수 있어요. SLA 설정이나 Workflow 상태 구성은 포털 노출 여부와 무관하고, 고객은 보통 JSM 라이선스 없이도 포털을 이용할 수 있습니다.\n핵심: Request Type 노출 = Portal Group 배정",
  },
  {
    id: "jsm2-2",
    question:
      "An agent wants to see only the tickets that are currently assigned to them, without building a new filter. What is the fastest way to do this?",
    options: [
      "Open the 'Assigned to me' queue in the project sidebar",
      "Ask the project administrator to create a personal queue",
      "Export all open tickets to CSV and filter by assignee",
      "Use the Customer Satisfaction report filtered by agent",
    ],
    answerIndexes: [0],
    explanation:
      "담당자 본인에게 할당된 티켓은 기본 제공되는 'Assigned to me' 큐에서 바로 확인할 수 있어요. 별도 큐 생성, CSV 추출, 만족도 리포트는 불필요하거나 목적이 다릅니다.\n핵심: 내 담당 티켓 확인 = Assigned to me Queue",
  },
  {
    id: "jsm2-3",
    question:
      "Which combination is required for a user to reply to customers with public comments in a service project?",
    options: [
      "A Jira Software license and the 'Browse Projects' permission",
      "A Confluence license and membership in the linked space",
      "A Jira Service Management agent license and the 'Service Desk Team' role in the project",
      "Being added as a Request Participant on the ticket",
    ],
    answerIndexes: [2],
    explanation:
      "고객에게 공개 댓글을 작성하려면 JSM 에이전트 라이선스와 Service Desk Team 역할이 필요해요. Jira Software 라이선스, Confluence 라이선스, Request Participant만으로는 에이전트 기능을 쓸 수 없습니다.\n핵심: 공개 댓글 작성 = JSM Agent 라이선스 + Service Desk Team 역할",
  },
  {
    id: "jsm2-4",
    question:
      "A customer wants a colleague to receive all updates on their open request. Which two ways can this be achieved? (Select Two)",
    options: [
      "The customer shares the request with the colleague from the customer portal",
      "The agent adds the colleague to the 'Request participants' field",
      "The agent adds the colleague as a watcher on the linked Confluence page",
      "The agent changes the reporter to the colleague",
      "The customer adds the colleague's email to the request summary",
    ],
    answerIndexes: [0, 1],
    explanation:
      "동료가 요청 업데이트를 함께 받으려면 고객이 포털에서 요청을 공유하거나, 에이전트가 Request participants에 동료를 추가하면 돼요. Confluence watcher, Reporter 변경, 요약에 이메일 적기는 해당되지 않습니다.\n핵심: 요청 업데이트 공유 = Request participants 또는 포털 공유",
  },
  {
    id: "jsm2-5",
    question:
      "Customers from the same company want to be able to view and follow each other's requests in the customer portal. Which feature should be used?",
    options: ["Request types", "Organizations", "Queues", "Components"],
    answerIndexes: [1],
    explanation:
      "같은 회사 고객들을 묶어 서로의 요청을 확인하게 하려면 Organizations 기능을 사용해요. Request Type, Queue, Component는 이런 용도가 아닙니다.\n핵심: 같은 회사 고객 간 요청 공유 = Organizations",
  },
  {
    id: "jsm2-6",
    question:
      "A service desk only operates from 9:00 to 18:00 on weekdays. The 'Time to resolution' SLA should not count time outside these hours. What should be configured?",
    options: [
      "A pause condition for the 'Closed' status",
      "An automation rule that stops the SLA at 18:00",
      "A calendar with working hours applied to the SLA goal",
      "A separate queue for after-hours tickets",
    ],
    answerIndexes: [2],
    explanation:
      "업무시간 외 시간을 SLA 계산에서 제외하려면 Calendar에 업무시간을 설정하고 SLA 목표에 적용해요. 상태별 pause 조건이나 매일 자동화로 강제 종료하는 방식은 적절하지 않습니다.\n핵심: SLA 업무시간 계산 = Calendar",
  },
  {
    id: "jsm2-7",
    question:
      "An agent sees a pause icon next to the 'Time to first response' SLA on a ticket. What does this indicate?",
    options: [
      "The SLA has already been breached",
      "The SLA goal was deleted by an administrator",
      "The ticket currently meets a pause condition, such as a 'Waiting for customer' status",
      "The agent manually paused the timer from the SLA field",
    ],
    answerIndexes: [2],
    explanation:
      "Pause 아이콘은 티켓이 설정된 Pause condition(예: Waiting for customer)을 충족해 SLA 타이머가 일시 정지됐다는 뜻이에요. Breach, 목표 삭제, 수동 정지와는 다릅니다.\n핵심: SLA Pause 아이콘 = Pause condition 충족",
  },
  {
    id: "jsm2-8",
    question:
      "An agent needs to find every ticket in the project whose 'Time to resolution' SLA has been breached. Which JQL query should they use?",
    options: [
      '"Time to resolution" = breached()',
      'SLA = "breached"',
      "status = Breached",
      '"Time to resolution" > 0',
    ],
    answerIndexes: [0],
    explanation:
      'SLA 초과 티켓은 JQL의 breached() 함수로 검색해요: "Time to resolution" = breached(). 다른 보기들은 올바른 JQL 문법이 아니거나 목표 초과 여부를 판단하지 못합니다.\n핵심: SLA 초과 티켓 검색 = breached()',
  },
  {
    id: "jsm2-9",
    question:
      "An agent frequently sends the same instructions for resetting a VPN connection to customers. Which feature lets the agent insert this text quickly into a reply?",
    options: [
      "Request type descriptions",
      "Canned responses",
      "Customer notification templates",
      "Issue labels",
    ],
    answerIndexes: [1],
    explanation:
      "자주 쓰는 답변을 저장해뒀다가 빠르게 불러오는 기능은 Canned responses예요. Request type 설명, 알림 템플릿, 라벨은 반복 답변 삽입 기능이 아닙니다.\n핵심: 반복 답변 재사용 = Canned responses",
  },
  {
    id: "jsm2-10",
    question:
      "After a system outage, an agent needs to close 40 duplicate tickets at once with the same resolution. What is the most efficient method?",
    options: [
      "Open each ticket and transition it individually",
      "Delete the tickets from the project settings",
      "Ask each customer to close their own request from the portal",
      "Select the tickets from an issue search and use the bulk change operation",
    ],
    answerIndexes: [3],
    explanation:
      "동일한 조건의 티켓 여러 개를 한 번에 처리하려면 이슈 검색 후 Bulk change를 사용해요. 하나씩 처리하거나 삭제, 고객에게 요청하는 방식은 비효율적입니다.\n핵심: 여러 티켓 일괄 처리 = Bulk change",
  },
  {
    id: "jsm2-11",
    question:
      "When a customer starts typing a summary for a new request in the portal, related knowledge base articles appear below the field. What is the main purpose of this behavior?",
    options: [
      "To deflect requests by letting customers solve the issue themselves",
      "To automatically assign the request to an agent",
      "To set the priority of the request",
      "To notify the knowledge base owner of new requests",
    ],
    answerIndexes: [0],
    explanation:
      "요청 작성 중 관련 지식 베이스 문서를 추천하는 것은 고객이 스스로 해결하도록 유도해 요청 생성을 줄이는 Request Deflection 목적이에요. 자동 배정, 우선순위 설정, 담당자 알림과는 무관합니다.\n핵심: 문서 자동 추천 = Request Deflection",
  },
  {
    id: "jsm2-12",
    question:
      "A service desk manager wants to measure how often customers found an answer in the knowledge base and did not raise a request. Which report is most relevant?",
    options: ["Created vs Resolved", "Workload", "Requests deflected", "SLA met vs breached"],
    answerIndexes: [2],
    explanation:
      "고객이 지식 베이스로 스스로 해결하고 요청을 만들지 않은 비율은 Requests deflected 리포트로 확인해요. Created vs Resolved, Workload, SLA met vs breached는 목적이 다릅니다.\n핵심: 지식 베이스를 통한 요청 감소 측정 = Requests deflected",
  },
  {
    id: "jsm2-13",
    question: "In the default configuration, when is a customer satisfaction (CSAT) survey sent to the customer?",
    options: [
      "When the request is first created",
      "When an agent adds an internal note",
      "When the request is assigned to an agent",
      "When the request is resolved",
    ],
    answerIndexes: [3],
    explanation:
      "기본 설정에서는 요청이 Resolved된 후 CSAT 설문이 발송돼요. 생성 시점, 내부 노트 작성, 담당자 배정 시점은 아닙니다.\n핵심: CSAT 설문 = 기본적으로 요청 해결 후 발송",
  },
  {
    id: "jsm2-14",
    question:
      "An agent adds an internal note to a ticket. With default notification settings, what does the customer receive?",
    options: [
      "An email containing the note",
      "No notification at all",
      "A portal banner announcing the update",
      "A summary email at the end of the day",
    ],
    answerIndexes: [1],
    explanation:
      "Internal note는 고객에게 공개되지 않는 내부 전용 댓글이라 기본 설정에서는 고객에게 아무 알림도 가지 않아요.\n핵심: Public comment = 고객 공개 / Internal note = 내부 전용, 알림 없음",
  },
  {
    id: "jsm2-15",
    question:
      "An agent wants a new queue that shows only 'Network' category tickets for their team. Who is normally able to create this queue?",
    options: [
      "Any customer of the project",
      "Any collaborator with a Jira Software license",
      "A project administrator",
      "The reporter of the tickets",
    ],
    answerIndexes: [2],
    explanation:
      "새 Queue를 만들고 구성하는 권한은 일반적으로 프로젝트 관리자(Project Administrator)에게 있어요. 고객, Collaborator, Reporter는 Queue를 생성할 수 없습니다.\n핵심: Queue 생성 및 관리 = 프로젝트 관리자 권한",
  },
  {
    id: "jsm2-16",
    question:
      "A change request is waiting for approval from a manager. Which two places can the approver use to approve or decline the request? (Select Two)",
    options: [
      "The issue view in Jira Service Management",
      "The customer portal",
      "The project's Created vs Resolved report",
      "The SLA settings page",
      "The queue configuration screen",
    ],
    answerIndexes: [0, 1],
    explanation:
      "승인자는 Jira Service Management의 Issue view나 Customer portal에서 승인/거절을 처리할 수 있어요. 리포트, SLA 설정, 큐 구성 화면은 승인 기능과 무관합니다.\n핵심: 승인 처리 위치 = Issue view 또는 Customer portal",
  },
  {
    id: "jsm2-17",
    question:
      "A single incident is affecting many customers and needs coordinated escalation. Which action in the incident flags it so that responders and stakeholders treat it with the highest urgency?",
    options: [
      "Adding the 'urgent' label",
      "Changing the request type to 'Service request'",
      "Marking the incident as a major incident",
      "Moving the incident to the 'Waiting for support' status",
    ],
    answerIndexes: [2],
    explanation:
      "다수 고객에게 영향을 주는 심각한 장애는 Major Incident로 지정해 조직적인 대응을 이끌어내요. 라벨 추가, 요청 유형 변경, 상태 이동만으로는 공식적인 중요 장애 표시가 되지 않습니다.\n핵심: 중대한 장애 표시 = Major Incident",
  },
  {
    id: "jsm2-18",
    question:
      "An on-call agent cannot cover their shift next Tuesday, and a teammate has agreed to cover it. What should be added to the on-call schedule?",
    options: [
      "An override for that time period",
      "A new rotation for the whole team",
      "A routing rule for all alerts",
      "A new escalation policy",
    ],
    answerIndexes: [0],
    explanation:
      "특정 하루만 담당자를 대신하는 경우 전체 로테이션을 바꾸지 않고 해당 기간만 Override로 설정해요. Rotation 변경, Routing rule, Escalation policy는 다른 목적입니다.\n핵심: 특정 기간 On-call 담당자 변경 = Override",
  },
  {
    id: "jsm2-19",
    question:
      "An alert has been triggered and the responsible agent starts working on it. Which two actions are commonly performed on alerts? (Select Two)",
    options: [
      "Acknowledge the alert so escalation stops",
      "Convert the alert into a knowledge base article",
      "Close the alert after the issue is resolved",
      "Delete the on-call schedule linked to the alert",
      "Change the customer portal theme",
    ],
    answerIndexes: [0, 2],
    explanation:
      "Alert 처리의 기본 흐름은 담당자가 확인(Acknowledge)해서 에스컬레이션을 멈추고, 해결 후 Close하는 거예요. KB 문서 변환, 온콜 일정 삭제, 포털 테마 변경은 Alert 처리와 무관합니다.\n핵심: Alert 처리 흐름 = Acknowledge → 대응 → Close",
  },
  {
    id: "jsm2-20",
    question:
      "An agent is writing an automation rule that sends a reply including the reporter's name. Which syntax inserts the reporter's display name into the message?",
    options: [
      "$[reporter.name]",
      "{{issue.reporter.displayName}}",
      "[reporter:displayName]",
      "%REPORTER%",
    ],
    answerIndexes: [1],
    explanation:
      "Jira Automation의 Smart value 문법은 {{issue.reporter.displayName}}처럼 중괄호 두 개를 사용해 이슈 필드값을 삽입해요. 다른 문법들은 Jira Automation에서 지원하지 않습니다.\n핵심: 동적 값 삽입 = {{issue.필드명}}",
  },
  {
    id: "jsm2-21",
    question:
      "An automation rule that should add a comment to new incidents did not run on a recent ticket. Where should the agent or admin look first to find out why?",
    options: [
      "The rule's audit log",
      "The customer portal settings",
      "The Created vs Resolved report",
      "The on-call schedule",
    ],
    answerIndexes: [0],
    explanation:
      "자동화 규칙이 실행되지 않았거나 예상과 다르게 동작했다면 먼저 Audit log에서 실행 이력과 실패 원인을 확인해야 해요. 포털 설정, 리포트, 온콜 일정은 실행 여부 확인과 무관합니다.\n핵심: Automation 실행 실패 원인 확인 = Audit log",
  },
  {
    id: "jsm2-22",
    question:
      "Which two channels can customers use to submit requests to a Jira Service Management project? (Select Two)",
    options: [
      "The customer portal",
      "Email sent to the project's connected email address",
      "The project's workflow editor",
      "The Jira Software backlog",
      "The SLA configuration page",
    ],
    answerIndexes: [0, 1],
    explanation:
      "고객은 Customer portal 접속 또는 프로젝트에 연결된 이메일 주소로 메일을 보내 요청을 제출할 수 있어요. Workflow editor, Jira Software backlog, SLA 설정 화면은 고객의 요청 접수 채널이 아닙니다.\n핵심: 고객 요청 접수 채널 = Customer portal + Email",
  },
  {
    id: "jsm2-23",
    question:
      "An agent confirms that a customer's issue is caused by a software defect and needs the development team, which works in a Jira Software project, to fix it. What is the best way to escalate while keeping both tickets connected?",
    options: [
      "Copy the description into a new email to the developers",
      "Change the request type to 'Bug'",
      "Use 'Create linked work item' to create a linked issue in the Jira Software project",
      "Add the developers as Request Participants",
    ],
    answerIndexes: [2],
    explanation:
      "JSM 요청을 유지하면서 개발팀 이슈와 연결하려면 Create linked work item으로 Jira Software 프로젝트에 연결된 이슈를 생성해요. 이메일 전달, 요청 유형 변경, Request Participant 추가는 두 티켓을 공식적으로 연결하지 못합니다.\n핵심: JSM 요청을 개발 작업으로 연결 = Create linked work item",
  },
  {
    id: "jsm2-24",
    question:
      "An agent wants to check whether other customers have recently reported a problem similar to the one they are working on. Which Atlassian Intelligence feature helps with this?",
    options: ["Similar requests", "Generative tone suggestions", "Comment summaries", "Automatic SLA calculation"],
    answerIndexes: [0],
    explanation:
      "현재 요청과 유사한 다른 고객의 요청을 찾아주는 Atlassian Intelligence 기능은 Similar requests예요. 어조 개선, 댓글 요약, SLA 계산과는 다른 기능입니다.\n핵심: 유사한 고객 요청 검색 = Similar requests",
  },
  {
    id: "jsm2-25",
    question:
      "Which Atlassian Intelligence capability can answer common customer questions automatically in channels such as Slack or the portal by using knowledge base content?",
    options: ["Request type suggestions", "Virtual service agent", "Queue sorting", "Smart values"],
    answerIndexes: [1],
    explanation:
      "지식 베이스 콘텐츠를 활용해 Slack이나 포털 등에서 고객 질문에 자동으로 답변하는 기능은 Virtual service agent예요. 요청 유형 추천, 큐 정렬, Smart values와는 다릅니다.\n핵심: 지식 베이스 기반 고객 자동 응대 = Virtual service agent",
  },
  {
    id: "jsm2-26",
    question:
      "A service desk manager wants to know whether the team's backlog is growing or shrinking over the last 30 days. Which report is most useful?",
    options: ["Satisfaction", "Requests deflected", "Created vs Resolved", "Knowledge base usage"],
    answerIndexes: [2],
    explanation:
      "생성된 요청과 해결된 요청 수를 비교해 backlog 증감 추세를 파악하는 리포트는 Created vs Resolved예요. Satisfaction, Requests deflected, Knowledge base usage는 목적이 다릅니다.\n핵심: Backlog 증감 추세 = Created vs Resolved",
  },
  {
    id: "jsm2-27",
    question: "In Jira Cloud, which keyboard shortcut opens the dialog to create a new issue?",
    options: ["c", "j", "k", "/"],
    answerIndexes: [0],
    explanation:
      "Jira Cloud에서 새 이슈 생성 창을 여는 단축키는 c예요(Create의 약자). j, k는 탐색용, /는 검색 관련 단축키입니다.\n핵심: 이슈 생성 단축키 = c",
  },
  {
    id: "jsm2-28",
    question:
      "A company has several service projects (IT, HR, and Facilities). Where can customers see all the portals they have access to in one place?",
    options: ["The Help Center", "The project sidebar", "The issue view", "The Created vs Resolved report"],
    answerIndexes: [0],
    explanation:
      "여러 서비스 프로젝트의 포털을 한곳에서 확인하는 공간은 Help Center예요. 프로젝트 사이드바, 이슈 화면, 리포트는 여러 포털을 한 번에 보여주지 않습니다.\n핵심: 여러 서비스 프로젝트 포털 통합 확인 = Help Center",
  },
  {
    id: "jsm2-29",
    question:
      "An agent is handling a request about a broken monitor and wants to record which specific hardware item is affected so the history of that item can be tracked. Which feature should be used?",
    options: [
      "Labels",
      "Components",
      "The Assets field linked to the hardware object",
      "The Request participants field",
    ],
    answerIndexes: [2],
    explanation:
      "특정 하드웨어 자산의 이력을 추적하려면 Assets 필드에 실제 하드웨어 객체를 연결해야 해요. Labels와 Components는 단순 분류 태그일 뿐 자산 이력을 관리하지 않고, Request participants는 참여자 지정 기능입니다.\n핵심: 하드웨어 자산과 티켓 연결 및 이력 추적 = Assets",
  },
  {
    id: "jsm2-30",
    question:
      "A customer replies by email to a ticket that is in the 'Waiting for customer' status. With the default workflow, what typically happens?",
    options: [
      "The reply is discarded because the ticket is not open",
      "A new separate ticket is created",
      "The ticket is automatically closed",
      "The reply is added as a comment and the ticket transitions back to 'Waiting for support'",
    ],
    answerIndexes: [3],
    explanation:
      "Waiting for customer 상태에서 고객이 이메일로 답변하면 기존 티켓에 댓글로 추가되고, 기본 워크플로에서는 Waiting for support로 전환돼요. 답변이 폐기되거나 새 티켓이 생기거나 자동 종료되지 않습니다.\n핵심: 고객 이메일 답변 → 댓글 추가 → Waiting for support 전환",
  },
];
