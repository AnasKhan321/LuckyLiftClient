import  { ECSClient, RunTaskCommand } from '@aws-sdk/client-ecs'

const ecsClient = new ECSClient({ 
    region: process.env.AWS_REGION as string ,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID  as string ,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET  as string
    }
})



const config = {
    CLUSTER: process.env.AWS_CLUSTER as string ,
    TASK: process.env.AWS_TASK as string 
}


export async function GET(request : Request){
    await runnewTask()  ; 
    return Response.json({data : "Success"})
}




const runnewTask = async()=>{

    const command = new RunTaskCommand({
        cluster: config.CLUSTER as string ,
        taskDefinition: config.TASK as string ,
        launchType: 'FARGATE',
        count: 1,
        networkConfiguration: {
            awsvpcConfiguration: {
                assignPublicIp: 'ENABLED',
                subnets: ['subnet-088117033df2f6c23', 'subnet-0ab3f4e0da7b896fc', 'subnet-09316e97b45c1a202'],
                securityGroups: ['sg-0e8d35b6015762619']
            }
        },
        overrides: {
            containerOverrides: [
                {
                    name: process.env.AWS_TASK_IMAGE_NAME as string,
                }
            ]
        }
    })
    console.log("running successfully")
    await ecsClient.send(command)
}